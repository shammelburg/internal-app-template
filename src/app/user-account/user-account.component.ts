import { Component, inject } from '@angular/core';
import { DarkModeService } from '../core/services/dark-mode.service';
import { PageWrapperComponent } from '../shared/page-wrapper/page-wrapper.component';
import { CommonFacadeService } from '../core/facades/common.facade';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [PageWrapperComponent],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css',
})
export class UserAccountComponent {
  darkModeService = inject(DarkModeService);
  commonFacade = inject(CommonFacadeService);

  common = this.commonFacade.common;

  theme = this.darkModeService.theme;

  setTheme(e: any) {
    const theme = e.target.value;
    this.darkModeService.toggleTheme(theme);
  }
}
