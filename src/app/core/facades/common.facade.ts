import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CommonStoreService } from '../store/common.store';
import { Router } from '@angular/router';
import { UserHttpService } from '../http/common.http';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class CommonFacadeService {
  commonStore = inject(CommonStoreService);
  router = inject(Router);
  http = inject(UserHttpService);

  common = toSignal(this.commonStore.common$);

  constructor(){
    this.getCommonAsync()
  }

  async getCommonAsync() {
    if (!this.#getCommonState()) {
      const common = await firstValueFrom(this.http.getCommon());
      this.commonStore.setState({ ...common });
    }

    return this.commonStore.getState();
  }

  #getCommonState(): boolean {
    const exists = this.commonStore.getState().userName;
    return exists ? true : false;
  }
}
