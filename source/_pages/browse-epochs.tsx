import * as React from 'react';
import { BrandType } from '../constants';
import { BlocksFeatureProvider } from '../features/blocks/ui/BlocksFeatureProvider';
import EpochsBrowser from '../features/epochs/ui/EpochsBrowser';
import { EpochsFeatureProvider } from '../features/epochs/ui/EpochsFeatureProvider';
import { Footer, Header, Layout } from '../widgets/layout';

export const BlockPage = () => (
  <Layout header={<Header brandType={BrandType.SHRINKED} />}>
    <BlocksFeatureProvider>
      <EpochsFeatureProvider>
        <EpochsBrowser />
      </EpochsFeatureProvider>
    </BlocksFeatureProvider>
    <Footer />
  </Layout>
);

export default BlockPage;
