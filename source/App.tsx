import { Router } from '@reach/router';
import * as React from 'react';
import { Root, Routes } from 'react-static';
import { NavigationFeatureProvider } from './features/navigation/ui/NavigationFeatureProvider';
import { NetworkInfoFeatureProvider } from './features/network-info/ui/NetworkInfoFeatureProvider';
import { SearchFeatureProvider } from './features/search/ui/SearchFeatureProvider';
import GraphQLProvider from './lib/graphql/GraphQLProvider';
import PolymorphThemeProvider from './styles/theme/PolymorphThemeProvider';

// const App = () => (
//   <Root>
//     <GraphQLProvider>
//       <PolymorphThemeProvider>
//         <NetworkInfoFeatureProvider>
//           <NavigationFeatureProvider>
//             <SearchFeatureProvider>
//               <React.Suspense fallback={<em>Loading...</em>}>
//                 <Router>
//                   <Routes path="*" />
//                 </Router>
//               </React.Suspense>
//             </SearchFeatureProvider>
//           </NavigationFeatureProvider>
//         </NetworkInfoFeatureProvider>
//       </PolymorphThemeProvider>
//     </GraphQLProvider>
//   </Root>
// );

const App = () => (
  <Root>
    <PolymorphThemeProvider>
      <NavigationFeatureProvider>
        <React.Suspense fallback={<em>Loading...</em>}>
          <Router>
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </NavigationFeatureProvider>
    </PolymorphThemeProvider>
  </Root>
);

export default App;
