import { produce } from 'immer';
import {
  declareStateUpdates,
  declareStore,
  StoreWithUpdates,
} from 'rx-effects';

import { ReactionType } from 'jazz-vc-common/src/models';
import { ParticipantId } from 'jazz-vc-common/src/participant';

import { ReactionCounterMap, UserReactionsMap } from './types';

export type CounterSettings = {
  ThrottleWindowTimeSec: number;
  MinReactionShowCount: number;
  PanelDisappearTimeSec: number;
};

export type ReactionCounterState = Readonly<{
  isActive: boolean;
  isShowResult: boolean;
  userReactionsMap: UserReactionsMap;
  reactionsCounter: ReactionCounterMap;
  counterSettings: CounterSettings;
  timeDelay: number;
}>;

export const REACTION_COUNTER_STATE: ReactionCounterState = {
  isActive: false,
  isShowResult: false,
  userReactionsMap: new Map(),
  reactionsCounter: new Map(),
  counterSettings: {
    ThrottleWindowTimeSec: 3_000,
    MinReactionShowCount: 2,
    PanelDisappearTimeSec: 3_000,
  },
  timeDelay: Date.now() + 3_000,
};

export const REACTION_COUNTER_STATE_UPDATES =
  declareStateUpdates<ReactionCounterState>()({
    setCounterActivated(isActive: boolean) {
      return (state) => ({ ...state, isActive });
    },

    setIsShowResult(isShowResult: boolean) {
      return (state) => ({ ...state, isShowResult });
    },

    setReactionCounter(participantId: ParticipantId, reaction: ReactionType) {
      return produce((state) => {
        if (!state.userReactionsMap.has(participantId)) {
          state.userReactionsMap.set(participantId, new Map());
        }

        if (!state.userReactionsMap.get(participantId)?.has(reaction)) {
          state.userReactionsMap.get(participantId)?.set(reaction, 1);

          const count = state.reactionsCounter.get(reaction);
          state.reactionsCounter.set(reaction, count ? count + 1 : 1);
        }
      });
    },

    setCounterSettings(counterSettings: CounterSettings){
      return (state) => ({...state, counterSettings})
    },

    setTimeDelay(timeDelay: number) {
      return (store) => ({...store, timeDelay})
    },

    clearMaps(){
      return produce((store) => {
        store.userReactionsMap.clear();
        store.reactionsCounter.clear();
      })
    }

  });

export type ReactionCounterStore = StoreWithUpdates<
  ReactionCounterState,
  typeof REACTION_COUNTER_STATE_UPDATES
>;

export const createReactionCounterStore = declareStore({
  initialState: REACTION_COUNTER_STATE,
  updates: REACTION_COUNTER_STATE_UPDATES,
  options: { name: 'ReactionCounterStore' },
});
