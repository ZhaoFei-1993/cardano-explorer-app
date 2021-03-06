import App from 'next/app';
import {
  NextComponentType,
  NextPageContext,
} from 'next/dist/next-server/lib/utils';
import Head from 'next/head';
import React from 'react';
import NoSSR from 'react-no-ssr';
import '../config/mobx.config';
import { NavigationFeatureProvider } from '../features/navigation/ui/NavigationFeatureProvider';
import { NetworkInfoFeatureProvider } from '../features/network-info/ui/NetworkInfoFeatureProvider';
import { BrowserUpdate } from '../features/outdated-browser/BrowserUpdate';
import { SearchFeatureProvider } from '../features/search/ui/SearchFeatureProvider';
import GraphQLProvider from '../lib/graphql/GraphQLProvider';
import PolymorphThemeProvider from '../styles/theme/PolymorphThemeProvider';
import LoadingSpinner from '../widgets/loading-spinner/LoadingSpinner';

type PageComponentWithStaticLayout = NextComponentType<NextPageContext, any> & {
  getStaticLayout?: (page: React.ReactNode) => JSX.Element;
  pageTitle: string;
};

class CardanoExplorer extends App {
  public render() {
    const { pageProps } = this.props;
    const Component = this.props.Component as PageComponentWithStaticLayout;
    const emptyLayout = (page: JSX.Element) => page;
    const wrapInStaticLayout = Component.getStaticLayout || emptyLayout;
    // Provide global app features that must survive page navigation:
    return (
      <GraphQLProvider>
        <PolymorphThemeProvider>
          <NetworkInfoFeatureProvider>
            <NavigationFeatureProvider>
              <SearchFeatureProvider>
                {wrapInStaticLayout(
                  <NoSSR onSSR={<LoadingSpinner />}>
                    <BrowserUpdate />
                    <Head>
                      {Component.pageTitle && (
                        <title>{Component.pageTitle}</title>
                      )}
                      {process.env.NODE_ENV !== 'production' && (
                        <link
                          rel="stylesheet"
                          type="text/css"
                          href={`/_next/static/css/styles.chunk.css?v=${Date.now()}`}
                        />
                      )}
                    </Head>
                    <Component {...pageProps} />
                  </NoSSR>
                )}
              </SearchFeatureProvider>
            </NavigationFeatureProvider>
          </NetworkInfoFeatureProvider>
        </PolymorphThemeProvider>
      </GraphQLProvider>
    );
  }
}

export default CardanoExplorer;
