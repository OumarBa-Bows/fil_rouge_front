import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../model/product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {PageResponse} from '../../model/pageResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api =
    'http://localhost:8080/api/products';

  constructor(
    private http: HttpClient
  ) {}

  getAll(page: number = 0, size: number = 20): Observable<PageResponse<Product>> {
    return this.http.get<PageResponse<Product>>(
      `${this.api}/all?page=${page}&size=${size}`
    )
  }

  getById(id: number) {

    return this.http.get<Product>(
      `${this.api}/${id}`
    );
  }

  create(product: Product, file?: File | null): Observable<Product> {
    const formData = new FormData();
    // Append the DTO as a JSON blob so the backend can deserialize @RequestBody
    formData.append(
      'product',
      new Blob(
        [JSON.stringify(product)],
        { type: 'application/json' }
      )
    );

    if (file) {
      formData.append('file', file);
    }
    return this.http.post<Product>(`${this.api}/add`, formData);
  }

  update(id: number, product: Product) {
    return this.http.post<Product>(
      `${this.api}/update/${id}`,
      product
    );
  }

  delete(id: number) {
    return this.http.delete(
      `${this.api}/delete/${id}`
    );
  }


}
