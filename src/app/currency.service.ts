import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timer, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://api.apilayer.com/currency_data/live?source=RUB&currencies=USD,EUR,GBR,CNY,JPY,TRY';
  private apiKey = 'x2DL8CXnJvvn3SYlxr56y3JNnHx2nHTk';

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<any> {
    const headers = new HttpHeaders().set('apikey', this.apiKey);
    return this.http.get(this.apiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getCurrenciesPeriodically(): Observable<any> {
    return timer(0, 300000).pipe(
      switchMap(() => this.getCurrencies())
    );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
