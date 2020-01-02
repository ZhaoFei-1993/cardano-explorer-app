import { CardanoEra, CardanoNetwork } from './constants';

const isDocumentDefined = typeof document !== 'undefined';

export const environment = {
  CARDANO: {
    ERA: (process.env.CARDANO_ERA as CardanoEra) || CardanoEra.BYRON,
    GRAPHQL: {
      HTTP_URL: `${process.env.GRAPHQL_API_PROTOCOL || 'http'}://${process.env
        .GRAPHQL_API_HOST || 'localhost'}:${process.env.GRAPHQL_API_PORT ||
        '3100'}/${process.env.GRAPHQL_API_PATH || ''}`,
    },
    NETWORK:
      (process.env.CARDANO_NETWORK as CardanoNetwork) ||
      CardanoNetwork.INCENTIVIZED_TESTNET,
  },
  DEBUG: process.env.DEBUG || 'false',
  IS_RUNTIME_ENV: isDocumentDefined,
  IS_STATIC_ENV: !isDocumentDefined,
  REAL_TIME_FACTOR: Number(process.env.REAL_TIME_FACTOR),
};
