import { Observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ShowMoreButtonDecorator from '../../../widgets/decorators/ShowMoreButtonDecorator';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useEpochsFeature } from '../context';
import EpochList from './EpochList';

export const LatestEpochs = () => {
  const { actions, store } = useEpochsFeature();
  const history = useHistory();
  useEffect(() => {
    // Start fetching latest blocks on mount
    actions.startPollingLatestEpochs.trigger();
    // Stop fetching latest blocks on unmount
    return () => {
      actions.stopPollingLatestEpochs.trigger();
    };
  }, []);
  return (
    <Observer>
      {() => {
        const { latestEpochs } = store;
        return (
          <ShowMoreButtonDecorator
            label={'show more'}
            isHidden={
              store.isLoadingLatestEpochsFirstTime ||
              store.latestEpochs.length < 5
            }
            onClick={() => history.push('/browse-epochs')}
          >
            <EpochList
              title="Latest Epochs"
              items={latestEpochs}
              isLoading={store.isLoadingLatestEpochsFirstTime}
            />
            {store.isLoadingLatestEpochsFirstTime && <LoadingSpinner />}
          </ShowMoreButtonDecorator>
        );
      }}
    </Observer>
  );
};
