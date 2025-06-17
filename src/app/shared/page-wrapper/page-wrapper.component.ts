import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

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


  headerText = input.required<string>()
  showNav = input<boolean>(false)
}
