import { useObserver } from 'mobx-react-lite';
import * as React from 'react';
import { useStakePools } from '../hooks';
import UnmoderatedDataConsented from './pure/UnmoderatedDataConsented';

export const UnmoderatedDataConsentedContainer = () => {
  const { store } = useStakePools();
  const { showUnmoderatedData } = store;
  return useObserver(() => {
    if (showUnmoderatedData) {
      return <UnmoderatedDataConsented />;
    }
    return null;
  });
};

export default UnmoderatedDataConsentedContainer;
