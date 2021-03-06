import waitForExpect from 'wait-for-expect';
import { graphqlClient } from '../../../lib/graphql/graphqlClient';
import { NavigationActions } from '../../navigation';
import { NetworkInfoActions } from '../../network-info';
import { NetworkInfoApi } from '../../network-info/api';
import { NetworkInfoStore } from '../../network-info/store';
import { createSearchFeature, ISearchFeature } from '../index';
import { exampleAddressData } from './helpers/exampleAddressData';

describe('Searching for an address summary', () => {
  let search: ISearchFeature;
  beforeEach(() => {
    search = createSearchFeature(
      graphqlClient,
      { actions: new NavigationActions() },
      {
        store: new NetworkInfoStore(
          new NetworkInfoActions(),
          new NetworkInfoApi(graphqlClient)
        ),
      }
    );
    search.start();
  });
  afterEach(() => {
    search.stop();
  });
  it('searches for a summary related to the provided address', async () => {
    // 1. Trigger action
    search.actions.searchForAddress.trigger({
      address: exampleAddressData.address,
    });

    // 2. Check the API query status
    expect(search.api.searchForAddressQuery.isExecuting).toBe(true);

    // 3. Access the observable search result provided by the store
    await waitForExpect(() => {
      expect(search.store?.addressSearchResult?.finalBalance).toBe(
        exampleAddressData.finalBalance
      );
      expect(search.store?.addressSearchResult?.transactionsCount).toBe(
        exampleAddressData.transactionsCount
      );
    });
  });
});
