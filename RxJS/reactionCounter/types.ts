import { Query } from 'rx-effects';

import { ReactionType } from 'jazz-vc-common/src/models';
import { ParticipantId } from 'jazz-vc-common/src/participant';

export type ReactionCounterMap = Map<ReactionType, number>;
export type UserReactionsMap = Map<ParticipantId, ReactionCounterMap>;

export type ReactionCounterQueries = Readonly<{
  isActive: Query<boolean>;
  reactionCounter$: Query<ReactionCounterMap>;
  isShowResult$: Query<boolean>;
}>;

export type ReactionCounterService = Readonly<{
  activate: (isActive: boolean) => void;
}>;

export type ReactionCounterEvents = {
  type: 'statusChanged';
  payload: { isActive: boolean };
};
