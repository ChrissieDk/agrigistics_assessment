import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { PayrollData, PayrollSummary } from '../types/payroll';
import { PayrollService } from '../services/payroll.service';

@Injectable({ providedIn: 'root' })
export class PayrollStore {
  private readonly payrollService = inject(PayrollService);

  // state
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly data = signal<PayrollData | null>(null);

  // derived
  readonly employee = computed(() => this.data()?.employee ?? null);
  readonly items = computed(() => this.data()?.items ?? []);
  readonly summary = computed<PayrollSummary | null>(() => this.data()?.summary ?? null);

  constructor() {
    this.load();

    // example effect to log errors for visibility
    effect(() => {
      const err = this.error();
      if (err) console.error('[PayrollStore] load error:', err);
    });
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.payrollService.getPayroll().subscribe({
      next: (payload) => {
        this.data.set(payload);
        this.loading.set(false);
      },
      error: (e) => {
        this.error.set(e?.message ?? 'Failed to load payroll');
        this.loading.set(false);
      }
    });
  }
}


