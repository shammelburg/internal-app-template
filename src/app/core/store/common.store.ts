import { Injectable } from '@angular/core';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Store } from './store';

export interface CommonState {
  userName: string;
}

export function defauftCommonState(): CommonState {
  return {
    userName: ''
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
