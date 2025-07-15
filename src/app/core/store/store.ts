import { BehaviorSubject, Observable } from 'rxjs';

export class Store<T> {
  private _store: BehaviorSubject<T>;
  private _loading = new BehaviorSubject(false);

  /**
   * @param initialState provide an object model of T
   */
  protected constructor(initialState: T) {
    this._store = new BehaviorSubject(initialState);
  }

  // Store State Managed
  /** Returns an observable of T */
  get state$(): Observable<T> {
    return this._store.asObservable();
  }

  /** Gets state value of T */
  getState(): T {
    return this._store.getValue();
  }

  // getStatePropertyCopy(property: string) {
  //   return [...this.getState()[property]]
  // }

  /** Sets state value of T */
  setState(state: Partial<T>): void {
    this._store.next({ ...this.getState(), ...state });
    this.setLoading(false);
  }

  // Loading State Managed
  /** Returns an observable of boolean */
  get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  /** Sets global loading state */
  setLoading(loadingState: any) {
    this._loading.next(loadingState);
  }

  // addObjectToArray(stateProperty: string, model: any) {
  //   let newArray = [...this.getState()[stateProperty]]
  //   newArray = [...newArray, { ...model }]

  //   this._store.next({ ...this.getState(), [stateProperty]: newArray });
  //   this.setLoading(false)
  // }

  /**
   * Update an object in a state property array
   * @param stateProperty name of the property in your store
   * @param key the id of the object to update
   * @param model the object (including the key) to replace the state object in the array
   */
  // updateArrayObject(stateProperty: string, key: string, model: any) {
  //   const index = this.getState()[stateProperty].findIndex((i: any) => i[key] === model[key])
  //   let newArray = [...this.getState()[stateProperty]]
  //   newArray[index] = { ...newArray[index], ...model }

  //   this._store.next({ ...this.getState(), [stateProperty]: newArray });
  //   this.setLoading(false)
  // }

  // removeArrayObject(stateProperty: string, key: string, value: number) {
  //   const index = this.getState()[stateProperty].findIndex((i: any) => i[key] === value)
  //   let newArray = [...this.getState()[stateProperty]]
  //   newArray.splice(index, 1)

  //   this._store.next({ ...this.getState(), [stateProperty]: newArray });
  //   this.setLoading(false)
  // }
}
