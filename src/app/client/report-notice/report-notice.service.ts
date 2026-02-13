import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportNoticeService {

  private API_URL = 'https://armada.mide.gob.do/';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.API_URL);
  }

  getById(id: number) {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  create(reportNotice: any) {
    return this.http.post(this.API_URL, reportNotice);
  }

  update(id: number, reportNotice: any) {
    return this.http.put(`${this.API_URL}/${id}`, reportNotice);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
