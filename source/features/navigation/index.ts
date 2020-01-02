import * as H from 'history';
import * as React from 'react';
import Action from '../../lib/Action';
import { ensureContextExists } from '../../lib/react/hooks';
import { NavigationStore, Query } from './store';

/**
 * Defines the actions that are supported by this feature
 */
export class NavigationActions {
  public push: Action<{ path?: string; query?: Query }> = new Action();
}

/**
 * Defines the interface of this feature
 */
export interface INavigationFeature {
  actions: NavigationActions;
  store: NavigationStore;
  start: () => void;
  stop: () => void;
}

/**
 * Creates a new instance of this feature.
 *
 * This can be useful for testing, features that need to be
 * configured and / or displayed multiple times on the same page.
 */
export const createNavigationFeature = (
  history: H.History
): INavigationFeature => {
  const navigationActions = new NavigationActions();
  const navigationStore = new NavigationStore(navigationActions, history);

  return {
    actions: navigationActions,
    store: navigationStore,
    start() {
      navigationStore.start();
    },
    stop() {
      navigationStore.stop();
    },
  };
};

/**
 * The React context that can be reused and configured with instances
 * of the search feature (also multiple times on one page)
 */
export const navigationContext = React.createContext<INavigationFeature | null>(
  null
);

/**
 * Custom react hook that is used in container components to
 * access the configured feature of the context provider.
 */
export const useNavigationFeature = () =>
  ensureContextExists(navigationContext);

export const useNavigationFeatureOptionally = () =>
  React.useContext(navigationContext);
