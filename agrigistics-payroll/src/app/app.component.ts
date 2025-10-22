import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { PayrollStore } from './state/payroll.store';
import { PayrollTableComponent } from './components/payroll-table/payroll-table.component';
import { EmployeeInfoPanelComponent } from './components/employee-info-panel/employee-info-panel.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, AsyncPipe, PayrollTableComponent, EmployeeInfoPanelComponent, RightSidebarComponent, LeftSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'agrigistics-payroll';
  readonly store = inject(PayrollStore);
}
