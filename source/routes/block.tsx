import * as React from 'react';
import { BrandType } from '../constants';
import { BlockSearchResult } from '../features/search/ui/BlockSearchResult';
import { TransactionsFeatureProvider } from '../features/transactions/components/TransactionsFeatureProvider';
import { Footer, Header, Layout } from '../widgets/layout';

export const BlockPage = () => (
  <Layout header={<Header brandType={BrandType.SHRINKED} />}>
    <TransactionsFeatureProvider>
      <BlockSearchResult />
    </TransactionsFeatureProvider>
    <Footer />
  </Layout>
);

export default BlockPage;
