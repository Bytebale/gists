import { injectable, Module, token } from 'ditox';
import { createScope } from 'rx-effects';
import { Observable } from 'rxjs';

import { createEventBus, declareRuntimeModule } from 'jazz-platform/src';
import { queryProperty } from 'jazz-platform/src/rxeffects';
import { ConferencesQueries } from 'jazz-vc-core/src/conferences';
import { CONFERENCES_QUERIES_TOKEN } from 'jazz-vc-core/src/conferences/conferencesModule';

import { createReactionCounterController } from './counterController';
import { createReactionCounterStore } from './counterState';
import {
  REACTION_COUNTER_FLAGS_MODULE,
  REACTION_COUNTER_FLAGS_TOKEN,
} from './reactionCounterFlags';
import {
  ReactionCounterEvents,
  ReactionCounterQueries,
  ReactionCounterService,
} from './types';

export type ReactionCounterModule = Module<{
  events$: Observable<ReactionCounterEvents>;
  queries: ReactionCounterQueries;
  service: ReactionCounterService;
}>;

export const REACTION_COUNTER_QUERIES_TOKEN = token<ReactionCounterQueries>();
export const REACTION_COUNTER_SERVICE_TOKEN = token<ReactionCounterService>();
export const REACTION_COUNTER_EVENTS_TOKEN =
  token<Observable<ReactionCounterEvents>>();

export const REACTION_COUNTER_MODULE =
  declareRuntimeModule<ReactionCounterModule>({
    imports: [REACTION_COUNTER_FLAGS_MODULE],
    factory: injectable(createReactionCounterModule, {
      $reactionCounterFlags: REACTION_COUNTER_FLAGS_TOKEN,
      conferenceQueries: CONFERENCES_QUERIES_TOKEN,
    }),
    exports: {
      events$: REACTION_COUNTER_EVENTS_TOKEN,
      queries: REACTION_COUNTER_QUERIES_TOKEN,
      service: REACTION_COUNTER_SERVICE_TOKEN,
    },
  });

function createReactionCounterModule(params: {
  conferenceQueries: ConferencesQueries;
}): ReactionCounterModule {
  const { conferenceQueries } = params;
  const scope = createScope();
  const store = scope.createController(() => createReactionCounterStore());

  const eventBus = createEventBus<ReactionCounterEvents>();

  const controller = scope.createController(() =>
    createReactionCounterController({
      store,
      conferenceQueries,
    }),
  );

  return {
    events$: eventBus.event$,

    queries: {
      isActive: queryProperty(store, 'isActive'),
      reactionCounter$: queryProperty(store, 'reactionsCounter'),
      isShowResult$: queryProperty(store, 'isShowResult'),
    },

    service: controller,

    destroy: scope.destroy,
  };
}
