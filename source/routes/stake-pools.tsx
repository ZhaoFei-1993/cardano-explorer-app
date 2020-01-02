import * as React from 'react';
import { BrandType } from '../constants';
import EpochSummary from '../features/epochs/ui/EpochSummary';
import { StakePoolsContainer } from '../features/stake-pools/ui/StakePoolsContainer';
import StakePoolsFeatureProvider from '../features/stake-pools/ui/StakePoolsFeatureProvider';
import { UnmoderatedDataConsentedContainer } from '../features/stake-pools/ui/UnmoderatedDataConsentedContainer';
import Container from '../widgets/container/Container';
import { Footer, Header, Layout } from '../widgets/layout';

export const StakePoolsPage = () => (
  <Layout>
    <Header brandType={BrandType.SHRINKED} />
    <StakePoolsFeatureProvider>
      <UnmoderatedDataConsentedContainer />
      <Container hasTopMargin>
        <EpochSummary
          epoch={{
            blocksCount: 21073,
            lastBlockAt: new Date(1569144483000),
            number: 135,
            output: '8397621',
            percentage: 97,
            slotsCount: 21600,
            startedAt: new Date(1568366883000),
            transactionsCount: '12',
          }}
          title="Epoch"
        />
      </Container>
      <StakePoolsContainer />
    </StakePoolsFeatureProvider>
    <Footer />
  </Layout>
);

export default StakePoolsPage;
