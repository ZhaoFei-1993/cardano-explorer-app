import React, { ReactNode, useEffect } from 'react';

interface ICssVariablesManagerProps {
  variables: {
    [key: string]: string;
  };
  children: ReactNode;
}

export const CssVariablesProvider = ({
  children,
  variables,
}: ICssVariablesManagerProps) => {
  useEffect(() => {
    // Apply css variables to document element
    Object.keys(variables).forEach(key => {
      if (document.documentElement) {
        document.documentElement.style.setProperty(key, variables[key]);
      }
    });
  }, [variables]);
  return <>{children}</>;
};
