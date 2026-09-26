import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';

type EntryType = 'udhaar' | 'payment';

interface KhataCustomer {
  id: string;
  name: string;
  phone: string;
  openingBalance: number;
}

interface KhataEntry {
  id: number;
  customerId: string;
  date: string;
  description: string;
  type: EntryType;
  amount: number;
}

interface LedgerEntry extends KhataEntry {
  balance: number;
}

function dateDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

@Component({
  selector: 'app-payment',
  imports: [Sidebar, CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
  readonly today = dateDaysAgo(0);
  readonly customers = signal<KhataCustomer[]>([
    { id: 'cust-1', name: 'Ramesh Patil', phone: '98765 43210', openingBalance: 0 },
    { id: 'cust-2', name: 'Sunita Devi', phone: '98765 12034', openingBalance: 0 },
    { id: 'cust-3', name: 'Imran Khan', phone: '99887 61234', openingBalance: 0 },
    { id: 'cust-4', name: 'Meena Sharma', phone: '91234 56780', openingBalance: 0 },
    { id: 'cust-5', name: 'Suresh Yadav', phone: '90909 80807', openingBalance: 0 },
  ]);
  readonly entries = signal<KhataEntry[]>([
    {
      id: 1,
      customerId: 'cust-1',
      date: dateDaysAgo(0),
      description: 'Rice 5kg, Toor dal 1kg',
      type: 'udhaar',
      amount: 680,
    },
    {
      id: 2,
      customerId: 'cust-1',
      date: dateDaysAgo(0),
      description: 'Cash received',
      type: 'payment',
      amount: 200,
    },
    {
      id: 3,
      customerId: 'cust-1',
      date: dateDaysAgo(1),
      description: 'Cooking oil, sugar',
      type: 'udhaar',
      amount: 425,
    },
    {
      id: 4,
      customerId: 'cust-2',
      date: dateDaysAgo(0),
      description: 'Monthly groceries',
      type: 'udhaar',
      amount: 1250,
    },
    {
      id: 5,
      customerId: 'cust-2',
      date: dateDaysAgo(2),
      description: 'Payment received',
      type: 'payment',
      amount: 500,
    },
    {
      id: 6,
      customerId: 'cust-3',
      date: dateDaysAgo(1),
      description: 'Milk, bread, eggs',
      type: 'udhaar',
      amount: 265,
    },
    {
      id: 7,
      customerId: 'cust-4',
      date: dateDaysAgo(0),
      description: 'Tea, snacks, flour',
      type: 'udhaar',
      amount: 340,
    },
    {
      id: 8,
      customerId: 'cust-5',
      date: dateDaysAgo(3),
      description: 'Household items',
      type: 'udhaar',
      amount: 590,
    },
    {
      id: 9,
      customerId: 'cust-5',
      date: dateDaysAgo(0),
      description: 'Cash received',
      type: 'payment',
      amount: 300,
    },
  ]);
  readonly selectedCustomerId = signal('cust-1');
  readonly search = signal('');
  readonly entryType = signal<EntryType>('udhaar');
  readonly showCustomerForm = signal(false);
  readonly customerFormError = signal('');
  description = '';
  newCustomerName = '';
  newCustomerPhone = '';
  readonly selectedCustomer = computed(
    () => this.customers().find((customer) => customer.id === this.selectedCustomerId()) ?? null,
  );
  readonly filteredCustomers = computed(() => {
    const searchTerm = this.search().trim().toLocaleLowerCase();
    return this.customers().filter(
      (customer) =>
        customer.name.toLocaleLowerCase().includes(searchTerm) ||
        customer.phone.includes(searchTerm),
    );
  });
  readonly selectedEntries = computed<LedgerEntry[]>(() => {
    const customer = this.selectedCustomer();
    if (!customer) return [];

    let balance = customer.openingBalance;
    return this.entries()
      .filter((entry) => entry.customerId === customer.id)
      .sort((first, second) => first.date.localeCompare(second.date) || first.id - second.id)
      .map((entry) => {
        balance += entry.type === 'udhaar' ? entry.amount : -entry.amount;
        return { ...entry, balance };
      })
      .reverse();
  });
  readonly totalOutstanding = computed(() =>
    this.customers().reduce((total, customer) => total + this.getBalance(customer.id), 0),
  );
  readonly todayUdhaar = computed(() => this.todayTotal('udhaar'));
  readonly todayCollected = computed(() => this.todayTotal('payment'));
  readonly customersWithBalance = computed(
    () => this.customers().filter((customer) => this.getBalance(customer.id) > 0).length,
  );
  readonly formError = signal('');

  amount: number | null = null;
  private nextEntryId = 10;
  private nextCustomerId = 6;

  toggleCustomerForm(): void {
    this.customerFormError.set('');
    this.showCustomerForm.update((visible) => !visible);
  }

  addCustomer(): void {
    const name = this.newCustomerName.trim();
    const phone = this.newCustomerPhone.trim();

    if (!name) {
      this.customerFormError.set('Enter the customer name to create a khata.');
      return;
    }

    if (phone && this.customers().some((customer) => customer.phone === phone)) {
      this.customerFormError.set('A customer with this mobile number already exists.');
      return;
    }

    const id = `cust-${this.nextCustomerId++}`;
    this.customers.update((customers) => [
      ...customers,
      { id, name, phone: phone || 'No phone added', openingBalance: 0 },
    ]);
    this.selectedCustomerId.set(id);
    this.search.set('');
    this.newCustomerName = '';
    this.newCustomerPhone = '';
    this.customerFormError.set('');
    this.showCustomerForm.set(false);
  }

  getBalance(customerId: string): number {
    const customer = this.customers().find((item) => item.id === customerId);
    if (!customer) return 0;

    return this.entries()
      .filter((entry) => entry.customerId === customerId)
      .reduce(
        (balance, entry) => balance + (entry.type === 'udhaar' ? entry.amount : -entry.amount),
        customer.openingBalance,
      );
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toLocaleUpperCase();
  }

  addEntry(): void {
    const customer = this.selectedCustomer();
    const cleanDescription = this.description.trim();
    const amount = Number(this.amount);

    if (!customer || !cleanDescription || !Number.isFinite(amount) || amount <= 0) {
      this.formError.set('Select a customer and enter the item details and a valid amount.');
      return;
    }

    if (this.entryType() === 'payment' && amount > this.getBalance(customer.id)) {
      this.formError.set('Payment cannot be more than this customer’s outstanding balance.');
      return;
    }

    this.entries.update((entries) => [
      ...entries,
      {
        id: this.nextEntryId++,
        customerId: customer.id,
        date: this.today,
        description: cleanDescription,
        type: this.entryType(),
        amount,
      },
    ]);
    this.description = '';
    this.amount = null;
    this.formError.set('');
  }

  private todayTotal(type: EntryType): number {
    return this.entries()
      .filter((entry) => entry.date === this.today && entry.type === type)
      .reduce((total, entry) => total + entry.amount, 0);
  }
}
