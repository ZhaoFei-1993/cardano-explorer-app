import * as React from 'react';
import Head from 'react-helmet';
import sideBackgroundImage from '../assets/images/main-side-background.svg';
import { BrandType } from '../constants';
import { environment } from '../environment';
// import { BlocksFeatureProvider } from '../features/blocks/ui/BlocksFeatureProvider';
// import { LatestBlocks } from '../features/blocks/ui/LatestBlocks';
// import { EpochsFeatureProvider } from '../features/epochs/ui/EpochsFeatureProvider';
// import { LatestEpochs } from '../features/epochs/ui/LatestEpochs';
// import { SearchBar } from '../features/search/ui/SearchBar';
import { isMobileScreen } from '../helpers';
import { Footer, Header, Layout } from '../widgets/layout';
import LoadingSpinner from '../widgets/loading-spinner/LoadingSpinner';
import styles from './index.scss';

export const Index = () => (
  <>
    <Head>
      <title>Byron | Index</title>
    </Head>
    {/*{!isMobileScreen() && (*/}
    {/*  <div className={styles.headerBgContainer}>*/}
    {/*    <div className={styles.headerBg}>*/}
    {/*      <img src="/assets/images/main-header-background.png" />*/}
    {/*    </div>*/}
    {/*  </div>*/}
    {/*)}*/}
    <Layout>
      <Header brandType={BrandType.ENLARGED} />
      {/*<div>*/}
      {/*  <SearchBar brandType={BrandType.ENLARGED} />*/}
      {/*</div>*/}
      {environment.IS_STATIC_ENV ? (
        <LoadingSpinner />
      ) : (
        <></>
        // <BlocksFeatureProvider>
        //   <div className={styles.epochList}>
        //     <EpochsFeatureProvider>
        //       <LatestEpochs />
        //     </EpochsFeatureProvider>
        //   </div>
        //   <div className={styles.blockList}>
        //     <LatestBlocks />
        //   </div>
        // </BlocksFeatureProvider>
      )}
      <Footer />
    </Layout>
    {environment.IS_RUNTIME_ENV && !isMobileScreen() && (
      <div className={styles.sideBgContainer}>
        <div className={styles.sideBackgroundImageContainer}>
          <img
            src={sideBackgroundImage}
            className={styles.sideBackgroundImage}
          />
        </div>
      </div>
    )}
  </>
);

export default Index;
