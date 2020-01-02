import { useObserver } from 'mobx-react-lite';
import * as React from 'react';
import { BrandType } from '../constants';
import { useNavigationFeature } from '../features/navigation';
import { SearchType } from '../features/search/store';
import NoSearchResult from '../features/search/ui/NoSearchResult';
import { SearchBar } from '../features/search/ui/SearchBar';
import { Footer, Header, Layout } from '../widgets/layout';

export const NoSearchResults = () => {
  const navigation = useNavigationFeature();
  return useObserver(() => (
    <Layout>
      <Header brandType={BrandType.ENLARGED} />
      <SearchBar brandType={BrandType.ENLARGED} />
      <NoSearchResult
        searchQuery={navigation.store.query.id as string}
        searchType={SearchType.unknown}
      />
      <Footer />
    </Layout>
  ));
};

export default NoSearchResults;
