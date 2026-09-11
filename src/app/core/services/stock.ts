import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../../model/stock';
import { StockDTO } from '../../dto/stock.dto';
import { PageResponse } from '../../model/pageResponse';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private api = 'http://localhost:8080/api/stocks';

  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 20): Observable<PageResponse<StockDTO>> {
    return this.http.get<PageResponse<StockDTO>>(`${this.api}?page=${page}&size=${size}`);
  }

  getById(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.api}/${id}`);
  }

  create(stockDTO: StockDTO): Observable<Stock> {
    return this.http.post<Stock>(this.api, stockDTO);
  }

  update(id: number, stockDTO: StockDTO): Observable<Stock> {
    return this.http.post<Stock>(`${this.api}/${id}`, stockDTO);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
