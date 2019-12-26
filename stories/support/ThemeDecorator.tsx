import React from 'react';
import PolymorphThemeProvider from '../../source/styles/theme/PolymorphThemeProvider';

import '../../source/styles/global/fonts.scss';
import '../../source/styles/global/reset.scss';
import './global.scss';

import styles from './ThemeDecorator.scss';

interface IProps {
  children: React.ReactNode;
}

export const ThemeDecorator = ({ children }: IProps) => (
  <PolymorphThemeProvider>
    <div className={styles.storyContainer}>{children}</div>
  </PolymorphThemeProvider>
);
