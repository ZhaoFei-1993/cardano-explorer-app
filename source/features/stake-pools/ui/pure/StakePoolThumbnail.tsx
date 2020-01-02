import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { IStakePoolThumbnailProps } from '../../types';
import styles from './StakePoolThumbnail.scss';

const ClockIcon = require('../../../../assets/images/stake-pools/clock-icon.svg');

const StakePoolThumbnail = ({
  isSelected,
  onSelect,
  stakePool,
  color,
  children,
}: IStakePoolThumbnailProps) => {
  const { ranking, ticker, retiring } = stakePool;
  const containerStyles = classnames([
    styles.stakePoolThumbnailContainer,
    isSelected ? styles.isHighlighted : null,
  ]);
  return (
    <div className={containerStyles}>
      <button onClick={onSelect as any} />
      <div className={styles.content}>
        <div className={styles.ticker}>{ticker}</div>
        <div className={styles.ranking} style={{ color }}>
          {ranking}
        </div>
        {retiring && (
          <div className={styles.clock}>
            <ClockIcon className={styles.clockIcon} />
          </div>
        )}
        <div
          className={styles.colorBand}
          style={{
            background: color,
          }}
        />
      </div>
      {children}
    </div>
  );
};
export default observer(StakePoolThumbnail);
