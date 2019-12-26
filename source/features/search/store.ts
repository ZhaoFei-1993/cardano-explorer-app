import { action, computed, observable, runInAction } from 'mobx';
import { createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { isNotNull } from '../../lib/types';
import { ADDRESS_SEARCH_RESULT_PATH } from '../address';
import { addressDetailTransformer } from '../address/api/transformers';
import { IAddressSummary } from '../address/types';
import { BLOCK_SEARCH_RESULT_PATH } from '../blocks';
import { blockDetailsTransformer } from '../blocks/api/transformers';
import { IBlockDetailed } from '../blocks/types';
import { EPOCH_SEARCH_RESULT_PATH } from '../epochs';
import { epochOverviewTransformer } from '../epochs/api/transformers';
import { IEpochOverview } from '../epochs/types';
import { TRANSACTION_SEARCH_RESULT_PATH } from '../transactions';
import { transactionDetailsTransformer } from '../transactions/api/transformers';
import { ITransactionDetails } from '../transactions/types';
import { SearchApi } from './api';
import {
  INavigationFeatureDependency,
  INetworkInfoFeatureDependency,
  NO_SEARCH_RESULTS_PATH,
  SearchActions,
} from './index';

export enum SearchType {
  address = 'Address',
  id = 'ID',
  number = 'Number',
  unknown = 'Unknown',
}

export class SearchStore extends Store {
  @observable public addressSearchResult: IAddressSummary | null = null;
  @observable public blockSearchResult: IBlockDetailed | null = null;
  @observable public epochSearchResult: IEpochOverview | null = null;
  @observable public transactionSearchResult: ITransactionDetails | null = null;

  private readonly searchApi: SearchApi;
  private readonly searchActions: SearchActions;
  private readonly navigation: INavigationFeatureDependency;
  private readonly networkInfo: INetworkInfoFeatureDependency;

  constructor(
    searchActions: SearchActions,
    searchApi: SearchApi,
    navigation: INavigationFeatureDependency,
    networkInfo: INetworkInfoFeatureDependency
  ) {
    super();
    this.searchApi = searchApi;
    this.searchActions = searchActions;
    this.navigation = navigation;
    this.networkInfo = networkInfo;

    this.registerActions(
      createActionBindings([
        [
          this.searchActions.addressSearchRequested,
          this.onAddressSearchRequested,
        ],
        [
          this.searchActions.blockNumberSearchRequested,
          this.onSearchByBlockNumberRequested,
        ],
        [this.searchActions.idSearchRequested, this.onIdSearchRequested],
        [
          this.searchActions.epochNumberSearchRequested,
          this.onSearchByEpochNumberRequested,
        ],
        [this.searchActions.searchById, this.searchById],
        [this.searchActions.searchForAddress, this.searchForAddress],
        [
          this.searchActions.searchForBlockByNumber,
          this.searchForBlockByNumber,
        ],
        [
          this.searchActions.searchForEpochByNumber,
          this.searchForEpochByNumber,
        ],
        [
          this.searchActions.unknownSearchRequested,
          this.onUnknownSearchRequested,
        ],
      ])
    );
  }

  @computed get isSearching() {
    return (
      this.searchApi.searchForAddressQuery.isExecuting ||
      this.searchApi.searchForBlockByNumberQuery.isExecuting ||
      this.searchApi.searchByIdQuery.isExecuting ||
      this.searchApi.searchForBlockByNumberQuery.isExecuting ||
      this.searchApi.searchForEpochByNumberQuery.isExecuting
    );
  }

  // ========= PRIVATE ACTION HANDLERS ==========

  private onAddressSearchRequested = async ({
    address,
  }: {
    address: string;
  }) => {
    this.navigation.actions.push.trigger({
      path: ADDRESS_SEARCH_RESULT_PATH,
      query: { address },
    });
  };

  /**
   * Executes query for entities by ID, determining the intent from the result
   *
   * Redirects to the corresponding search result or "no result" page.
   *
   * @param id
   */
  private onIdSearchRequested = async ({ id }: { id: string }) => {
    const result = await this.searchApi.searchByIdQuery.execute({
      id,
    });
    let path = '';
    if (result?.blocks.length > 0) {
      const blockData = result.blocks[0];
      if (isNotNull(blockData)) {
        runInAction(() => {
          this.blockSearchResult = blockDetailsTransformer(blockData);
        });
        path = BLOCK_SEARCH_RESULT_PATH;
      }
    } else if (result?.transactions.length > 0) {
      const txSearchResult = result.transactions[0];
      if (isNotNull(txSearchResult)) {
        runInAction(() => {
          this.transactionSearchResult = transactionDetailsTransformer(
            txSearchResult
          );
        });
        path = TRANSACTION_SEARCH_RESULT_PATH;
      }
    } else {
      return this.onUnknownSearchRequested({ query: id });
    }
    if (path !== '') {
      this.navigation.actions.push.trigger({
        path,
        query: { id },
      });
    }
  };

  @action private onSearchByBlockNumberRequested = async (params: {
    number: number;
  }) => {
    await this.searchForBlockByNumber({ number: params.number });
    if (this.blockSearchResult?.id) {
      this.navigation.actions.push.trigger({
        path: BLOCK_SEARCH_RESULT_PATH,
        query: {
          id: this.blockSearchResult?.id,
        },
      });
    }
  };

  private onSearchByEpochNumberRequested = async (params: { num: number }) => {
    this.navigation.actions.push.trigger({
      path: EPOCH_SEARCH_RESULT_PATH,
      query: params,
    });
  };

  private onUnknownSearchRequested = async (params: { query: string }) => {
    this.navigation.actions.push.trigger({
      path: NO_SEARCH_RESULTS_PATH,
      query: params,
    });
  };

  @action private searchForAddress = async ({
    address,
  }: {
    address: string;
  }) => {
    // Do not execute queries more than necessary!
    if (
      this.searchApi.searchForAddressQuery.isExecuting ||
      this.addressSearchResult?.address === address
    ) {
      return;
    }
    this.addressSearchResult = null;
    const result = await this.searchApi.searchForAddressQuery.execute({
      address,
    });
    if (isNotNull(result)) {
      runInAction(() => {
        this.addressSearchResult = addressDetailTransformer(address, result);
      });
    }
  };

  @action private searchById = async ({ id }: { id: string }) => {
    // Do not execute queries more than necessary!
    if (
      this.searchApi.searchByIdQuery.isExecuting ||
      this.blockSearchResult?.id === id ||
      this.transactionSearchResult?.id === id
    ) {
      return;
    }
    this.blockSearchResult = null;
    this.transactionSearchResult = null;
    return this.onIdSearchRequested({ id });
  };

  @action private searchForBlockByNumber = async (params: {
    number: number;
  }) => {
    // Do not trigger another search if we already have the requested data!
    if (
      this.searchApi.searchForBlockByNumberQuery.isExecuting ||
      this.blockSearchResult?.number === params.number
    ) {
      return;
    }
    this.blockSearchResult = null;
    const result = await this.searchApi.searchForBlockByNumberQuery.execute(
      params
    );
    if (result) {
      const blockData = result.blocks[0];
      if (isNotNull(blockData)) {
        runInAction(() => {
          this.blockSearchResult = blockDetailsTransformer(blockData);
        });
      }
    }
  };

  @action private searchForEpochByNumber = async (params: {
    number: number;
  }) => {
    // Do not trigger another search if we already have the requested data!
    if (
      this.searchApi.searchForEpochByNumberQuery.isExecuting ||
      this.epochSearchResult?.number === params.number
    ) {
      return;
    }
    this.epochSearchResult = null;
    const result = await this.searchApi.searchForEpochByNumberQuery.execute(
      params
    );
    if (result) {
      const epochData = result.epochs[0];
      if (isNotNull(epochData)) {
        runInAction(() => {
          this.epochSearchResult = epochOverviewTransformer(
            epochData,
            this.networkInfo.store
          );
        });
      }
    }
  };
}
