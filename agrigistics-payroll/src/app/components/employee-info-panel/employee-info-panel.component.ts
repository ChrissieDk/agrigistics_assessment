import { CommonModule, CurrencyPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PayrollStore } from '../../state/payroll.store';

@Component({
  selector: 'app-employee-info-panel',
  standalone: true,
  imports: [CommonModule, NgIf, CurrencyPipe],
  templateUrl: './employee-info-panel.component.html'
})
export class EmployeeInfoPanelComponent {
  private readonly store = inject(PayrollStore);

  readonly employee = this.store.employee;
  readonly summary = this.store.summary;
}
