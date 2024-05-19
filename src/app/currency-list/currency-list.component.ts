import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {
  currencies: any = {};
  previousCurrencies: any = {};
  displayCurrencies: string[] = ['USD', 'EUR', 'GBR'];
  additionalCurrencies: string[] = ['CNY', 'JPY', 'TRY'];
  error: string | null = null;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrenciesPeriodically().subscribe({
      next: data => {
        this.previousCurrencies = { ...this.currencies };
        this.currencies = data.quotes;
        this.error = null;
      },
      error: err => {
        this.error = err.message;
      }
    });
  }

  toggleCurrency(): void {
    if (this.displayCurrencies.length <= 3) {
      const nextCurrency = this.additionalCurrencies.find(currency => !this.displayCurrencies.includes(currency));
      if (nextCurrency) {
        this.displayCurrencies.push(nextCurrency);
      }
    } else {
      this.displayCurrencies.pop();
    }
  }

  getDifference(currency: string): number {
    if (this.previousCurrencies && this.previousCurrencies[currency]) {
      return this.currencies[currency] - this.previousCurrencies[currency];
    }
    return 0;
  }
}
