import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { calculatePaging } from '../../../lib/paging';
import { useUrlSearchParams } from '../../../lib/react/router';
import RouterPagination from '../../../widgets/browsing/RouterPagination';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';

import { useNetworkInfoFeature } from '../../network-info/context';
import { useBlocksFeature } from '../context';
import {
  BLOCKS_PER_PAGE_DEFAULT,
  BLOCKS_PER_PAGE_MAXIMUM,
  BLOCKS_PER_PAGE_MINIMUM,
} from '../index';
import BlockList from './BlockList';

interface IBlocksBrowserProps {
  epoch?: number;
  perPageDefault?: number;
  perPageMaximum?: number;
  perPageMinimum?: number;
  title: string;
  totalItems?: number;
}

const BlocksBrowser = (props: IBlocksBrowserProps) => {
  const queryParams = useUrlSearchParams();
  const currentPage = queryParams.get('page');
  const perPage = queryParams.get('perPage');

  const networkInfo = useNetworkInfoFeature();
  const { blockHeight } = networkInfo.store;
  const isBlockHeightAvailable = !!blockHeight;
  const blocks = useBlocksFeature();

  const query =
    props.epoch != null
      ? blocks.api.getBlocksInEpochQuery
      : blocks.api.getBlocksInRangeQuery;

  const paging = calculatePaging({
    currentPage,
    perPage,
    perPageDefault: props.perPageDefault ?? BLOCKS_PER_PAGE_DEFAULT,
    perPageMaximum: props.perPageMaximum ?? BLOCKS_PER_PAGE_MAXIMUM,
    perPageMinimum: props.perPageMinimum ?? BLOCKS_PER_PAGE_MINIMUM,
    totalItems: props.totalItems ?? blockHeight,
  });

  useEffect(() => {
    if (!isBlockHeightAvailable) {
      return;
    }
    blocks.actions.browseBlocks.trigger({
      epoch: props.epoch,
      page: paging.currentPage,
      perPage: paging.itemsPerPage,
    });
  }, [isBlockHeightAvailable, currentPage, perPage]);

  return isBlockHeightAvailable && !query.isExecutingTheFirstTime ? (
    <>
      <BlockList
        isLoading={query.isExecuting}
        title={props.title}
        items={blocks.store.browsedBlocks.slice().reverse()}
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

export default observer(BlocksBrowser);
