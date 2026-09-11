import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../model/category';
import { CategoryDTO } from '../../dto/category.dto';
import { PageResponse } from '../../model/pageResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private api = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 20): Observable<PageResponse<CategoryDTO>> {
    return this.http.get<PageResponse<CategoryDTO>>(`${this.api}?page=${page}&size=${size}`);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.api}/${id}`);
  }

  create(category: CategoryDTO): Observable<Category> {
    return this.http.post<Category>(`${this.api}/add`, category);
  }

  update(id: number, category: CategoryDTO): Observable<Category> {
    return this.http.post<Category>(`${this.api}/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
