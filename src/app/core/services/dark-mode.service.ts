import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  theme = signal<string | undefined>(
    localStorage.getItem('user-default-theme') || 'light'
  );

  constructor() {
    const theme = this.theme();
    this.toggleTheme(theme);
  }

  toggleTheme(theme: string | undefined) {
    if (theme === 'light') {
      localStorage.setItem('user-default-theme', theme);
      this.theme.set('light');
      document.documentElement.classList.remove('dark');
    }
    if (theme === 'dark') {
      localStorage.setItem('user-default-theme', theme);
      this.theme.set('dark');
      document.documentElement.classList.add('dark');
    }
  }

  private isSystemDark() {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      return false;
    }
  }

  darkModeEnabled() {
    return this.theme() === 'dark';
  }
}
