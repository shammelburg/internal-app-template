import { Component, inject } from '@angular/core';
import { PageWrapperComponent } from '../shared/page-wrapper/page-wrapper.component';
import { UserHttpService } from '../core/http/common.http';

import { AppNotificationService } from '../core/services/app-notification.service';
import { CommonFacadeService } from '../core/facades/common.facade';

@Component({
  selector: 'app-page-1',
  standalone: true,
  imports: [PageWrapperComponent],
  templateUrl: './page-1.component.html',
  styleUrl: './page-1.component.css',
})
export class Page1Component {
  commonFacade = inject(CommonFacadeService);
  notify = inject(AppNotificationService);



  constructor() {
  }


  ngOnDestroy() {
  }
}
