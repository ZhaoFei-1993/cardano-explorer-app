import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Root, Routes } from 'react-static';
import { NavigationFeatureProvider } from './features/navigation/ui/NavigationFeatureProvider';
import { NetworkInfoFeatureProvider } from './features/network-info/ui/NetworkInfoFeatureProvider';
import { SearchFeatureProvider } from './features/search/ui/SearchFeatureProvider';
import { GraphQLProvider } from './lib/graphql/GraphQLProvider';
import PolymorphThemeProvider from './styles/theme/PolymorphThemeProvider';
import LoadingSpinner from './widgets/loading-spinner/LoadingSpinner';

const App = () => (
  <Root>
    <GraphQLProvider>
      <PolymorphThemeProvider>
        <NetworkInfoFeatureProvider>
          <NavigationFeatureProvider>
            <SearchFeatureProvider>
              <React.Suspense fallback={<LoadingSpinner />}>
                <Switch>
                  <Route render={() => <Routes />} />
                </Switch>
              </React.Suspense>
            </SearchFeatureProvider>
          </NavigationFeatureProvider>
        </NetworkInfoFeatureProvider>
      </PolymorphThemeProvider>
    </GraphQLProvider>
  </Root>
);

export default App;
