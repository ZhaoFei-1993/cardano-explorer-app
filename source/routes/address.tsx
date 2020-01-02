import * as React from 'react';
import { BrandType } from '../constants';
import { AddressSearchResult } from '../features/search/ui/AddressSearchResult';
import { TransactionsFeatureProvider } from '../features/transactions/components/TransactionsFeatureProvider';
import { Footer, Header, Layout } from '../widgets/layout';

export const AddressPage = () => (
  <Layout header={<Header brandType={BrandType.SHRINKED} />}>
    <TransactionsFeatureProvider>
      <AddressSearchResult />
    </TransactionsFeatureProvider>
    <Footer />
  </Layout>
);

export default AddressPage;
