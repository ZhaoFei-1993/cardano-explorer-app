import { Router } from '@reach/router';
import React from 'react';
import { Root, Routes } from 'react-static';
import { NavigationFeatureProvider } from './features/navigation/ui/NavigationFeatureProvider';
import { NetworkInfoFeatureProvider } from './features/network-info/ui/NetworkInfoFeatureProvider';
import { SearchFeatureProvider } from './features/search/ui/SearchFeatureProvider';
import GraphQLProvider from './lib/graphql/GraphQLProvider';
import { CssVariablesProvider } from './styles/theme/CssVariablesProvider';
import PolymorphThemeProvider from './styles/theme/PolymorphThemeProvider';
import { cardanoExplorerTheme } from './styles/theme/theme';

function App() {
  return (
    <Root>
      <GraphQLProvider>
        <CssVariablesProvider variables={cardanoExplorerTheme}>
          <PolymorphThemeProvider>
            <NetworkInfoFeatureProvider>
              <NavigationFeatureProvider>
                <SearchFeatureProvider>
                  <React.Suspense fallback={<em>Loading...</em>}>
                    <Router>
                      <Routes path="*" />
                    </Router>
                  </React.Suspense>
                </SearchFeatureProvider>
              </NavigationFeatureProvider>
            </NetworkInfoFeatureProvider>
          </PolymorphThemeProvider>
        </CssVariablesProvider>
      </GraphQLProvider>
    </Root>
  );
}

export default App;
