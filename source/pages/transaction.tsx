import * as React from 'react';
import { BrandType } from '../constants';
import { TransactionSearchResult } from '../features/search/ui/TransactionSearchResult';
import { Footer, Header, Layout } from '../widgets/layout';

export const TransactionPage = () => (
  <Layout header={<Header brandType={BrandType.SHRINKED} />}>
    <TransactionSearchResult />
    <Footer />
  </Layout>
);

export default TransactionPage;
