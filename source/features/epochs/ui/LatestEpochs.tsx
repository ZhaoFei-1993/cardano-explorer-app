import { Observer, useObserver } from 'mobx-react-lite';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import ShowMoreButtonDecorator from '../../../widgets/decorators/ShowMoreButtonDecorator';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useEpochsFeature } from '../context';
import EpochList from './EpochList';

export const LatestEpochs = () => {
  const { actions, store } = useEpochsFeature();
  const history = useHistory();
  const { latestEpochs } = store;
  React.useEffect(() => {
    // Start fetching latest blocks on mount
    actions.startPollingLatestEpochs.trigger();
    // Stop fetching latest blocks on unmount
    return () => {
      actions.stopPollingLatestEpochs.trigger();
    };
  }, []);
  return useObserver(() => (
    <ShowMoreButtonDecorator
      label={'show more'}
      isHidden={
        store.isLoadingLatestEpochsFirstTime || store.latestEpochs.length < 5
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
  ));
};
