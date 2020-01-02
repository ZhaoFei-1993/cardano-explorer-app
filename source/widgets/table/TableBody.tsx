import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IColumnDefinition } from './Table';
import styles from './TableBody.scss';
import TableBodyRow from './TableBodyRow';

export interface ITableBodyProps {
  columns: Array<IColumnDefinition>;
  rows: Array<{ key: string | number }>;
}

const TableBody: React.FC<ITableBodyProps> = ({ columns, rows }) => (
  <TransitionGroup className={styles.bodyContainer}>
    {rows.map(row => (
      <CSSTransition
        classNames="row"
        timeout={{ enter: 500 }}
        exit={false}
        key={row.key}
      >
        <TableBodyRow columns={columns} row={row} />
      </CSSTransition>
    ))}
  </TransitionGroup>
);

export default observer(TableBody);
