import { FC } from 'react';

import { Body1 } from '@salutejs/plasma-b2c';
import { accent, backgroundSecondary } from '@salutejs/plasma-tokens-b2c';
import { useQuery } from 'rx-effects-react';
import styled from 'styled-components/macro';

import { Reaction } from 'jazz-app-web-universal/src/components/Conference/Reactions';
import { layoutBreakpoints } from 'jazz-app-web-universal/src/themes/breakpoints';

import { useReactionCounterQueries } from '#jazz-features/src/reactionCounter/react/hooks';

// eslint-disable-next-line local-rules/styled-data-attributes
const Panel = styled.div<{ suspended: boolean }>`
  background: ${backgroundSecondary};
  position: absolute;
  top: 5px;
  left: auto;
  border-radius: 24px;
  border: solid ${({ suspended }) => (suspended ? accent : backgroundSecondary)};
  padding: 8px;
  z-index: 150;

  @media (max-width: 391px) {
    left: 12px;
    right: 12px;
  }

  @media (max-width: 383px) {
    padding: 12px 20px;
  }
`;

const CounterWrapper = styled.div`
  box-sizing: border-box;

  display: flex;
  gap: 16px;

  ${Body1} {
    margin-bottom: 8px;
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  @media ${layoutBreakpoints.mobile} {
    display: flex;
    justify-content: space-between;
    max-width: 328px;
    flex-wrap: nowrap;
    left: 16px;
    right: 16px;
    bottom: 72px;
    height: auto;
    grid-row-gap: 12px;
    grid-column-gap: initial;
  }
`;

export const ReactionCounter: FC = () => {
  const { reactionCounter$, isShowResult$ } = useReactionCounterQueries();
  const reactionCounter = useQuery(reactionCounter$);
  const isSowhResult = useQuery(isShowResult$);

  if (reactionCounter.size < 2) {
    return null;
  }

  return (
    <Panel suspended={isSowhResult}>
      <CounterWrapper>
        {Array.from(reactionCounter).map(([reaction, value]) => (
          <div key={reaction}>
            <Body1>{value}</Body1>
            <Reaction reaction={reaction} />
          </div>
        ))}
      </CounterWrapper>
    </Panel>
  );
};
