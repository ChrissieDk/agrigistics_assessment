import { CommonModule, CurrencyPipe, NgIf, NgFor } from '@angular/common';
import { Component, computed, signal, inject } from '@angular/core';
import { PayrollStore } from '../../state/payroll.store';
import { EarningItem } from '../../types/payroll';

type SortKey = 'name' | 'description' | 'group' | 'quantity' | 'rate';
type SortDir = 'asc' | 'desc';

@Component({
  selector: 'app-payroll-table',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, CurrencyPipe],
  templateUrl: './payroll-table.component.html'
})
export class PayrollTableComponent {
  private readonly store = inject(PayrollStore);

  // UI state
  readonly query = signal<string>('');
  readonly sortKey = signal<SortKey>('name');
  readonly sortDir = signal<SortDir>('asc');

  readonly items = computed(() => this.store.items());

  readonly filteredSorted = computed(() => {
    const q = this.query().trim().toLowerCase();
    const key = this.sortKey();
    const dir = this.sortDir();
    const base = this.items();

    const filtered = q
      ? base.filter((i) =>
          [i.name, i.description ?? '', i.group, String(i.quantity), i.rate == null ? '' : String(i.rate)]
            .join(' ')
            .toLowerCase()
            .includes(q)
        )
      : base.slice();

    const sorted = filtered.sort((a, b) => compareBy(a, b, key));
    if (dir === 'desc') sorted.reverse();
    return sorted;
  });

  toggleSort(key: SortKey): void {
    if (this.sortKey() === key) {
      this.sortDir.set(this.sortDir() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortKey.set(key);
      this.sortDir.set('asc');
    }
  }
}

function compareBy(a: EarningItem, b: EarningItem, key: SortKey): number {
  switch (key) {
    case 'name':
    case 'description':
    case 'group':
      return (a[key] ?? '').localeCompare((b[key] ?? '') as string);
    case 'quantity':
      return a.quantity - b.quantity;
    case 'rate': {
      const av = a.rate ?? -Infinity; // nulls last
      const bv = b.rate ?? -Infinity;
      return av - bv;
    }
  }
}


