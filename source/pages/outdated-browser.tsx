import React from 'react';
import OutdatedBrowser from '../features/outdated-browser/OutdatedBrowser';
import { Layout } from '../widgets/layout';

const OutdatedBrowserPage = () => (
  <Layout>
    <OutdatedBrowser
      text="Your web browser is out of date"
      updateBrowserUrl="http://browser-update.org/update.html?force_outdated=true"
    />
    {/*<Footer />*/}
  </Layout>
);

export default OutdatedBrowserPage;
