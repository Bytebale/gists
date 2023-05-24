import { useDependency } from 'ditox-react';
import { Observable } from 'rxjs';

import { createQueryFacadeHook } from 'jazz-platform-react/src';

import {
  REACTION_COUNTER_EVENTS_TOKEN,
  REACTION_COUNTER_QUERIES_TOKEN,
  REACTION_COUNTER_SERVICE_TOKEN,
} from '../counterModule';
import {
  ReactionCounterEvents,
  ReactionCounterQueries,
  ReactionCounterService,
} from '../types';

export function useReactionCounterQueries(): ReactionCounterQueries {
  return useDependency(REACTION_COUNTER_QUERIES_TOKEN);
}

export const useReactionCounterQuery =
  createQueryFacadeHook<ReactionCounterQueries>(REACTION_COUNTER_QUERIES_TOKEN);

export function useReactionCounterService(): ReactionCounterService {
  return useDependency(REACTION_COUNTER_SERVICE_TOKEN);
}

export function useReactionCounterEvents(): Observable<ReactionCounterEvents> {
  return useDependency(REACTION_COUNTER_EVENTS_TOKEN);
}
