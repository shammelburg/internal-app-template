import { Injectable } from '@angular/core';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Store } from './store';

export interface CommonState {
  username: string;
  destinationFolder: string;
  sharedFolders: string[];
}

export function defauftCommonState(): CommonState {
  return {
    username: '',
    destinationFolder: '',
    sharedFolders: [],
  };
}

@Injectable({
  providedIn: 'root',
})
export class CommonStoreService extends Store<CommonState> {
  private CommonState$ = this.state$.pipe(distinctUntilChanged());

  common$ = this.CommonState$.pipe(
    map((state) => state),
    distinctUntilChanged()
  );

  constructor() {
    super(defauftCommonState());
  }

  restoreDefaultState() {
    this.setState({});
  }
}
