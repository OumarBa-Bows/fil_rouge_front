import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environement} from '../../environement/environement';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private api =  `${environement.baseUrl}api/documents`;

  constructor(private http: HttpClient) {}

  /**
   * POST /findByName — sends the fileName as plain text,
   * receives the file binary as a Blob.
   */
  getByFileName(fileName: string | undefined): Observable<Blob> {
    console.log("Fetching document with fileName:", fileName);
    return this.http.get(
      `${this.api}/findByName/`+fileName,
      {
        headers: new HttpHeaders({ 'Content-Type': 'text/plain' }),
        responseType: 'blob'
      }
    );
  }
}
