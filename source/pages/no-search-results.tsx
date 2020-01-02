import { useObserver } from 'mobx-react-lite';
import * as React from 'react';
import { BrandType } from '../constants';
import { useNavigationFeature } from '../features/navigation';
import { SearchType } from '../features/search/store';
import NoSearchResult from '../features/search/ui/NoSearchResult';
import { SearchBar } from '../features/search/ui/SearchBar';
import { SearchFeatureProvider } from '../features/search/ui/SearchFeatureProvider';
import { Footer, Header, Layout } from '../widgets/layout';

export const NoSearchResults = () => {
  const navigation = useNavigationFeature();
  return useObserver(() => (
    <Layout>
      <Header brandType={BrandType.ENLARGED} />
      <SearchFeatureProvider>
        <SearchBar brandType={BrandType.ENLARGED} />
      </SearchFeatureProvider>
      <NoSearchResult
        searchQuery={navigation.store.query.id as string}
        searchType={SearchType.unknown}
      />
      <Footer />
    </Layout>
  ));
};

export default NoSearchResults;
