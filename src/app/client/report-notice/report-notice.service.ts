import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportNoticeService {

  private API_URL = 'https://armada.mide.gob.do/';

  constructor(private http: HttpClient) {}

  getAll() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer`,
      })
    };
    
    return this.http.get<any[]>(`${this.API_URL}`, httpOptions);
  }

  getById(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer`,
      })
    };
    
    return this.http.get<any>(`${this.API_URL}/${id}`, httpOptions);
  }

  create(reportNotice: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer`,
      })
    };

    return this.http.post(`${this.API_URL}`, reportNotice, httpOptions);
  }

  update(id: number, reportNotice: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer`,
      })
    };

    return this.http.put(`${this.API_URL}/${id}`, reportNotice, httpOptions);
  }

  delete(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer`,
      })
    };
    
    return this.http.delete(`${this.API_URL}/${id}`, httpOptions);
  }
}
