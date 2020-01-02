import { useObserver } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigationFeature } from '../../features/navigation';
import Pagination from './Pagination';

export interface IPaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

export const RouterPagination = (props: IPaginationProps) => {
  const { currentPage, itemsPerPage, totalPages } = props;
  const navigation = useNavigationFeature();
  const onChangePage = (page: number) => {
    navigation.actions.push.trigger({
      query: {
        ...navigation.store.query,
        page,
        perPage: itemsPerPage,
      },
    });
  };
  return useObserver(() => (
    <Pagination
      currentPage={currentPage}
      onChangePage={onChangePage}
      totalPages={totalPages}
    />
  ));
};

export default RouterPagination;
