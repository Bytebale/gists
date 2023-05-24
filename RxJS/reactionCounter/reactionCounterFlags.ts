import {
    ConfigFlags,
    declareBooleanFlag,
    declareConfigFlags,
    declareFlagsModule,
  } from 'jazz-platform/src/configFlags';
  
  export type ReactionCounterFlags = ConfigFlags<{
    isEnabled: boolean;
  }>;
  
  export const REACTION_COUNTER_FLAGS = declareConfigFlags<ReactionCounterFlags>({
    isEnabled: declareBooleanFlag({
      key: 'features.reactionCounter.enabled',
      defaultValue: false,
      needsRestart: true,
    }),
  });
  
  export const {
    module: REACTION_COUNTER_FLAGS_MODULE,
    flagsToken: REACTION_COUNTER_FLAGS_TOKEN,
  } = declareFlagsModule(REACTION_COUNTER_FLAGS);
  