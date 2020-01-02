import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { calculatePaging } from '../../../lib/paging';
import { useUrlSearchParams } from '../../../lib/react/router';
import RouterPagination from '../../../widgets/browsing/RouterPagination';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';

import { useNetworkInfoFeature } from '../../network-info/context';
import { useEpochsFeature } from '../context';
import {
  EPOCHS_PER_PAGE_DEFAULT,
  EPOCHS_PER_PAGE_MAXIMUM,
  EPOCHS_PER_PAGE_MINIMUM,
} from '../index';
import EpochList from './EpochList';

const EpochsBrowser = () => {
  const queryParams = useUrlSearchParams();
  const currentPage = queryParams.get('page');
  const perPage = queryParams.get('perPage');
  // The network block height is required before doing any browsing
  const networkInfo = useNetworkInfoFeature();
  const { currentEpoch } = networkInfo.store;
  const isCurrentEpochAvailable = !!currentEpoch;
  const epochs = useEpochsFeature();
  const isLoadingFirstTime =
    epochs.api.getEpochsInRangeQuery.isExecutingTheFirstTime;

  const paging = calculatePaging({
    currentPage,
    perPage,
    perPageDefault: EPOCHS_PER_PAGE_DEFAULT,
    perPageMaximum: EPOCHS_PER_PAGE_MAXIMUM,
    perPageMinimum: EPOCHS_PER_PAGE_MINIMUM,
    totalItems: currentEpoch,
  });

  React.useEffect(() => {
    if (!isCurrentEpochAvailable) {
      return;
    }
    epochs.actions.browseEpochs.trigger({
      page: paging.currentPage,
      perPage: paging.itemsPerPage,
    });
  }, [currentEpoch, currentPage, perPage]);

  return isCurrentEpochAvailable && !isLoadingFirstTime ? (
    <>
      <EpochList
        isLoading={epochs.api.getEpochsInRangeQuery.isExecuting}
        title="Browse Epochs"
        items={epochs.store.browsedEpochs}
      />
      <RouterPagination
        currentPage={paging.currentPage}
        itemsPerPage={paging.itemsPerPage}
        totalPages={paging.totalPages}
      />
    </>
  ) : (
    <LoadingSpinner />
  );
};

export default observer(EpochsBrowser);
