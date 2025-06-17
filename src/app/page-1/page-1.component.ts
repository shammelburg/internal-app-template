import { Component, signal } from '@angular/core';
import { PageWrapperComponent } from '../shared/page-wrapper/page-wrapper.component';

@Component({
  selector: 'app-page-1',
  standalone: true,
  imports: [
    PageWrapperComponent
  ],
  templateUrl: './page-1.component.html',
  styleUrl: './page-1.component.css'
})
export class Page1Component {


}
