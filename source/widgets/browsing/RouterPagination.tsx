import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigationFeature } from '../../features/navigation';
import Pagination from './Pagination';

export interface IPaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

const RouterPagination = (props: IPaginationProps) => {
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
  return (
    <Pagination
      currentPage={currentPage}
      onChangePage={onChangePage}
      totalPages={totalPages}
    />
  );
};

export default observer(RouterPagination);
