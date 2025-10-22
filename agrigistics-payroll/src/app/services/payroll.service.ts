import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PayrollData } from '../types/payroll';

@Injectable({ providedIn: 'root' })
export class PayrollService {
  private readonly http = inject(HttpClient);

  getPayroll(): Observable<PayrollData> {
    return this.http.get<PayrollData>('/mock/payroll.json');
  }
}


