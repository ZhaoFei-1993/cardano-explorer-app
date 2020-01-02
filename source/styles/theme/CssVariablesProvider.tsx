import * as React from 'react';
import { environment } from '../../environment';

interface ICssVariablesManagerProps {
  variables: {
    [key: string]: string;
  };
  children: React.ReactNode;
}

export const CssVariablesProvider = ({
  children,
  variables,
}: ICssVariablesManagerProps) => {
  // Apply css variables to document element
  if (environment.IS_RUNTIME_ENV) {
    Object.keys(variables).forEach(key => {
      if (document.documentElement) {
        document.documentElement.style.setProperty(key, variables[key]);
      }
    });
  }
  return <>{children}</>;
};
