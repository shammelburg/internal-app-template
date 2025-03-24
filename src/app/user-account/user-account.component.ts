import { Component, inject } from '@angular/core';
import { DarkModeService } from '../core/services/dark-mode.service';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css',
})
export class UserAccountComponent {
  darkModeService = inject(DarkModeService);

  theme = this.darkModeService.theme;

  setTheme(e: any) {
    const theme = e.target.value;
    this.darkModeService.toggleTheme(theme);
  }
}
