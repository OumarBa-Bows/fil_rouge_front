import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/user';
import { PageResponse } from '../../model/pageResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 20): Observable<PageResponse<User>> {
    return this.http.get<PageResponse<User>>(`${this.api}?page=${page}&size=${size}`);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.api, user);
  }

  update(id: number, user: User): Observable<User> {
    return this.http.post<User>(`${this.api}/${id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
