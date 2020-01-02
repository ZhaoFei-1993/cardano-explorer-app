import { useObserver } from 'mobx-react-lite';
import * as React from 'react';
import UnmoderatedDataConsented from './pure/UnmoderatedDataConsented';
import { useStakePools } from '../hooks';

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
