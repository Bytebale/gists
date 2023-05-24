import { Controller, createAction, createScope } from 'rx-effects';

import { filterByType } from 'jazz-platform/src';
import { getClock1000 } from 'jazz-vc-core/src/clocks';
import { ConferencesQueries } from 'jazz-vc-core/src/conferences';

import { ReactionCounterStore } from './counterState';
import { ReactionCounterService } from './types';

export const createReactionCounterController = (params: {
  store: ReactionCounterStore;
  conferenceQueries: ConferencesQueries;
}): Controller<ReactionCounterService> => {
  const { store, conferenceQueries } = params;

  const activeRoomQueries = conferenceQueries.activeRoomQueries
  const activeRoomEvents = conferenceQueries.activeRoomEvents$

  const { $userPermissions } = activeRoomQueries;

  const scope = createScope();

  const activateCounterAction = createAction<boolean>();

  scope.handle<boolean>(activateCounterAction, (isActive) => {
    store.updates.setCounterActivated(isActive);
  });

  scope.handle(
    activeRoomEvents.pipe(filterByType('reaction')),
    ({ payload }) => {
      const { participantId, reaction } = payload;

      if (reaction && store.get().reactionsCounter.size === 0) {
        store.updates.setReactionCounter(participantId, reaction);
        store.updates.setTimeDelay(Date.now() + 3_000);
      }

      if (reaction && payload.timestamp <= store.get().timeDelay) {
        store.updates.setReactionCounter(participantId, reaction);
        store.updates.setTimeDelay(Date.now() + 3_000);
      }
    },
  );

  scope.handle(getClock1000(), () => {
    const { reactionsCounter, counterSettings, timeDelay } = store.get();
    const currentTime = Date.now();
    const expirationDate = timeDelay + counterSettings.ThrottleWindowTimeSec;

    if (currentTime >= timeDelay && currentTime <= expirationDate) {
      store.updates.setIsShowResult(true);
    } else {
      store.updates.setIsShowResult(false);
    }

    if (
      currentTime >= timeDelay &&
      reactionsCounter.size < counterSettings.MinReactionShowCount
    ) {
      store.updates.clearMaps();
    }

    if (currentTime >= expirationDate) {
      store.updates.clearMaps();
    }
  });

  return {
    activate: activateCounterAction,

    destroy: () => scope.destroy(),
  };
};
