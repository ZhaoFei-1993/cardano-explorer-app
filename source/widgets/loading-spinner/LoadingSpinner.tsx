import classnames from 'classnames';
import * as React from 'react';
import SpinnerBig from '../../assets/images/spinner-dark-big.inline.svg';
import SpinnerSmall from '../../assets/images/spinner-dark.inline.svg';
import styles from './LoadingSpinner.scss';

export interface ILoadingSpinnerProps {
  big?: boolean;
  medium?: boolean;
}

export default class LoadingSpinner extends React.Component<
  ILoadingSpinnerProps
> {
  public root?: HTMLDivElement | any;

  public render() {
    const { big, medium } = this.props;

    const componentClasses = classnames([
      styles.component,
      big ? styles.big : null,
      medium ? styles.medium : null,
      !big && !medium ? styles.small : null,
    ]);

    return (
      <div
        className={componentClasses}
        ref={div => {
          this.root = div;
        }}
      >
        {big ? (
          <SpinnerBig className={styles.icon} />
        ) : (
          <SpinnerSmall className={styles.icon} />
        )}
      </div>
    );
  }
}
