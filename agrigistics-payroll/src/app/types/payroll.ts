export type CurrencyCode = 'ZAR';

export interface Employee {
  id: string;
  code: string;
  name: string;
  team: string;
}

export interface EarningItem {
  id: string;
  name: string;
  description: string | null;
  group: 'Group 1' | 'Group 2' | 'Group 3' | string;
  quantity: number;
  rate: number | null; // unit rate; null indicates N/A or fixed
  currency: CurrencyCode;
}

export interface PayrollSummary {
  totalEarnings: number;
  totalDeductions: number;
  netTotal: number;
  contributions: {
    uif: number;
    paye: number;
    total: number;
  };
  currency: CurrencyCode;
}

export interface PayrollData {
  employee: Employee;
  summary: PayrollSummary;
  items: EarningItem[];
}


