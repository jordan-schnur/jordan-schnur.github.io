import {Component, Input} from '@angular/core';

@Component({
  selector: 'js-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() activeSection: string = '';
  isNavbarCollapsed = true;
  toggleNavbarCollapsing() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
