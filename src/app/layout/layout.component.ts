import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonFacadeService } from '../core/facades/common.facade';

import { toSignal } from '@angular/core/rxjs-interop';
import { DarkModeService } from '../core/services/dark-mode.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
    darkModeService = inject(DarkModeService);

    theme = this.darkModeService.theme;

  links = signal<any[]>([{ id: 1, name: 'Scanning', link: ['/app/scanning'] }]);
}
