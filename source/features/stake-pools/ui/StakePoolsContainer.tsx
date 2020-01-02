import { useObserver } from 'mobx-react-lite';
import * as React from 'react';
import Container from '../../../widgets/container/Container';
import { useStakePools } from '../hooks';
import StakePools from './pure/StakePools';
import UnmoderatedDataWarning from './pure/UnmoderatedDataWarning';

export const StakePoolsContainer = () => {
  const { store, actions } = useStakePools();
  const { stakePoolsList, showUnmoderatedData } = store;
  const { handleAcceptUnmoderatedData } = actions;
  return useObserver(() => {
    if (!showUnmoderatedData) {
      return (
        <UnmoderatedDataWarning
          onAcceptUnmoderatedData={handleAcceptUnmoderatedData.trigger}
        />
      );
    }
    return (
      <Container>
        <StakePools stakePoolsList={stakePoolsList} />
      </Container>
    );
  });
};
