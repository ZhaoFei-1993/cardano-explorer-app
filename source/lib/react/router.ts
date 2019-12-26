import { useLocation } from 'react-router-dom';

export function useUrlSearchParams() {
  return new URLSearchParams(useLocation().search);
}
