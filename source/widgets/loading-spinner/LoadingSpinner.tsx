import classnames from 'classnames';
import * as React from 'react';
import spinnerBig from '../../assets/images/spinner-dark-big.inline.svg';
import spinnerSmall from '../../assets/images/spinner-dark.inline.svg';
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
        <img src={big ? spinnerBig : spinnerSmall} className={styles.icon} />
      </div>
    );
  }
}
