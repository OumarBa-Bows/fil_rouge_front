import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private api = 'http://localhost:8080/api/documents';

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
