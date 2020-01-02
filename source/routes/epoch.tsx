import * as React from 'react';
import { BrandType } from '../constants';
import { BlocksFeatureProvider } from '../features/blocks/ui/BlocksFeatureProvider';
import EpochsSearchResult from '../features/search/ui/EpochsSearchResult';
import { Footer, Header, Layout } from '../widgets/layout';
import styles from './epoch.scss';

export const EpochPage = () => (
  <Layout header={<Header brandType={BrandType.SHRINKED} />}>
    <div className={styles.epochLayout}>
      <BlocksFeatureProvider>
        <EpochsSearchResult />
      </BlocksFeatureProvider>
      <Footer />
    </div>
  </Layout>
);

export default EpochPage;
