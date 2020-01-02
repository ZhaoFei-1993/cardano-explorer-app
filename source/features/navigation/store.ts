import * as H from 'history';
import { action, observable } from 'mobx';
import qs from 'query-string';
import { ActionProps, createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { NavigationActions } from './index';

export type Query = qs.ParsedQuery<string | number | boolean>;

export class NavigationStore extends Store {
  @observable public path: string;
  @observable public query: Query = {};

  private readonly navigationActions: NavigationActions;
  private readonly history: H.History;
  private unregisterHistorySubscription: H.UnregisterCallback;

  constructor(navigationActions: NavigationActions, router: H.History) {
    super();
    this.navigationActions = navigationActions;
    this.history = router;

    this.registerActions(
      createActionBindings([[this.navigationActions.push, this.push]])
    );
  }

  public async start(): Promise<void> {
    super.start();
    this.unregisterHistorySubscription = this.history.listen(
      this.updateStateOnLocationChange
    );
    this.updateStateOnLocationChange(this.history.location);
  }

  public async stop(): Promise<void> {
    super.stop();
    this.unregisterHistorySubscription();
  }

  // ========= HANDLE INTERNAL ACTIONS ==========

  @action private updateStateOnLocationChange = (location: H.Location) => {
    this.path = location.pathname;
    this.query = qs.parse(location.search, {
      parseBooleans: true,
      parseNumbers: true,
    });
  };

  // ========= HANDLE EXTERNAL ACTIONS ==========

  @action private push = async (
    params: ActionProps<typeof NavigationActions.prototype.push>
  ) => {
    return this.history.push({
      pathname: params.path,
      search: qs.stringify(params.query ?? this.query),
    });
  };
}
