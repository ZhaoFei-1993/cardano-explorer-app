import * as React from 'react';
import { environment } from '../environment';
import OutdatedBrowser from '../features/outdated-browser/OutdatedBrowser';
import { Footer, Layout } from '../widgets/layout';

const OutdatedBrowserPage = () => (
  <Layout>
    {environment.IS_RUNTIME_ENV && (
      <OutdatedBrowser
        text="Your web browser is out of date"
        updateBrowserUrl="http://browser-update.org/update.html?force_outdated=true"
      />
    )}
    <Footer />
  </Layout>
);

export default OutdatedBrowserPage;
