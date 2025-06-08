import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poral-manage',
  imports: [],
  templateUrl: './poral-manage.component.html',
  styleUrl: './poral-manage.component.css'
})
export class PoralManageComponent {
  constructor(private router: Router) {}

  navigateToUserManagement(): void {
    this.router.navigate(['/user-management']);
  }

  navigateToDataView(): void {
    // ניווט לעמוד צפיה בנתונים
    this.router.navigate(['/data-view']);
  }

}
