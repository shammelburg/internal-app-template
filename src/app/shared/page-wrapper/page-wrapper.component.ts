import { Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CommonFacadeService } from '../../core/facades/common.facade';

@Component({
  selector: 'app-page-wrapper',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './page-wrapper.component.html',
  styleUrl: './page-wrapper.component.css'
})
export class PageWrapperComponent {

  commonFacade = inject(CommonFacadeService);

  common = this.commonFacade.common

  headerText = input.required<string>()
  showNav = input<boolean>(false)
}
