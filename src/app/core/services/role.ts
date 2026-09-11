import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../../model/role';
import { PageResponse } from '../../model/pageResponse';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private api = 'http://localhost:8080/api/roles';

  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 20): Observable<PageResponse<Role>> {
    return this.http.get<PageResponse<Role>>(`${this.api}?page=${page}&size=${size}`);
  }

  getById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.api}/${id}`);
  }

  create(role: Role): Observable<Role> {
    return this.http.post<Role>(this.api, role);
  }

  update(id: number, role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.api}/${id}`, role);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

