import * as React from 'react';

import { stakePoolsContext } from '../contexts';
import { stakePoolsContextDefault } from '../index';

interface IProps {
  children: React.ReactNode;
}

const StakePoolsFeatureProvider = (props: IProps) => (
  <stakePoolsContext.Provider value={stakePoolsContextDefault}>
    {props.children}
  </stakePoolsContext.Provider>
);

export default StakePoolsFeatureProvider;
