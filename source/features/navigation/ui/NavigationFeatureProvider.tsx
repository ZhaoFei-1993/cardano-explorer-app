import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFeature } from '../../../lib/react/hooks';
import {
  createNavigationFeature,
  INavigationFeature,
  navigationContext,
} from '../index';

interface IProps {
  children: React.ReactNode;
}

export const NavigationFeatureProvider = (props: IProps) => {
  const [navigationFeature] = useState<INavigationFeature>(
    createNavigationFeature(useHistory())
  );
  useFeature(navigationFeature);
  return (
    <navigationContext.Provider value={navigationFeature}>
      {props.children}
    </navigationContext.Provider>
  );
};
