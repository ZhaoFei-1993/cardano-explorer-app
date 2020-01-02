import { useObserver } from 'mobx-react-lite';
import * as React from 'react';
import { calculatePaging, ICalculatePagingOutputs } from '../../../lib/paging';
import Pagination from '../../../widgets/browsing/Pagination';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { ITransactionDetails } from '../types';
import TransactionList from './TransactionList';
import styles from './TransactionsBrowser.scss';

export const TRANSACTIONS_PER_PAGE_DEFAULT = 2;
export const TRANSACTIONS_PER_PAGE_MINIMUM = 1;
export const TRANSACTIONS_PER_PAGE_MAXIMUM = 5;

interface ITransactionsBrowserProps {
  isLoading: boolean;
  isLoadingFirstTime: boolean;
  onPagingCalculated: (paging: ICalculatePagingOutputs) => void;
  onChangePage: (page: number) => void;
  currentPage?: string | number;
  perPage?: string | number;
  total: number;
  transactions: ITransactionDetails[];
}

const TransactionsBrowser = (props: ITransactionsBrowserProps) => {
  const paging = calculatePaging({
    currentPage: props.currentPage,
    perPage: props.perPage,
    perPageDefault: TRANSACTIONS_PER_PAGE_DEFAULT,
    perPageMaximum: TRANSACTIONS_PER_PAGE_MAXIMUM,
    perPageMinimum: TRANSACTIONS_PER_PAGE_MINIMUM,
    totalItems: props.total,
  });
  React.useEffect(() => {
    props.onPagingCalculated(paging);
  }, [props.currentPage, props.perPage]);
  return useObserver(() => (
    <>
      {!props.isLoadingFirstTime ? (
        <>
          <TransactionList
            isLoading={props.isLoading}
            title="Transactions"
            items={props.transactions}
          />
          {paging.totalPages > 0 ? (
            <Pagination
              currentPage={paging.currentPage}
              onChangePage={props.onChangePage}
              totalPages={paging.totalPages}
            />
          ) : (
            <div className={styles.noTransactions}>No Transactions</div>
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  ));
};

export default TransactionsBrowser;
