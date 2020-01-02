import { useObserver } from 'mobx-react-lite';
import * as React from 'react';
import ShowMoreButtonDecorator from '../../../widgets/decorators/ShowMoreButtonDecorator';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useNavigationFeature } from '../../navigation';
import { useBlocksFeature } from '../context';
import BlockList from './BlockList';

export const LatestBlocks = () => {
  const { actions, store } = useBlocksFeature();
  const navigation = useNavigationFeature();
  const { latestBlocks } = store;
  React.useEffect(() => {
    // Start fetching latest blocks on mount
    actions.startPollingLatestBlocks.trigger();
    // Stop fetching latest blocks on unmount
    return () => {
      actions.stopPollingLatestBlocks.trigger();
    };
  }, []);
  return useObserver(() => (
    <ShowMoreButtonDecorator
      label={'show more'}
      isHidden={
        store.isLoadingLatestBlocksFirstTime || store.latestBlocks.length < 10
      }
      onClick={() =>
        navigation.actions.push.trigger({ path: '/browse-blocks' })
      }
    >
      <BlockList
        isLoading={store.isLoadingLatestBlocksFirstTime}
        items={latestBlocks}
        title="Latest Blocks"
      />
      {store.isLoadingLatestBlocksFirstTime && <LoadingSpinner />}
    </ShowMoreButtonDecorator>
  ));
};
