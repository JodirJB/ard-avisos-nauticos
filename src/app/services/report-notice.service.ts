import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportNoticeService {

  private API_URL = 'https://armada.mide.gob.do/api/nautical-notices';
  private X_API_KEY = 'ard_key_4eee34de5e11251e34b7635d3ea47dc9';
  private X_API_SECRET = 'ard_secret_3df1edc1ab6c5f5f3c185dc21b7de694e11de438073eca798f829eae704e79d7';

  constructor(private http: HttpClient) { }

  getAll() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('x-api-key', this.X_API_KEY)
        .set('x-api-secret', this.X_API_SECRET)
        .set('Content-Type', 'multipart/form-data')
    };

    return this.http.get<any[]>(`${this.API_URL}/public`, httpOptions);
  }

  getById(noticeType: string, id: number) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('x-api-key', this.X_API_KEY)
        .set('x-api-secret', this.X_API_SECRET)
        .set('Content-Type', 'multipart/form-data')
    };

    return this.http.get<any>(`${this.API_URL}/public/${noticeType}/${id}`, httpOptions);
  }

  create(reportNotice: any) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('x-api-key', this.X_API_KEY)
        .set('x-api-secret', this.X_API_SECRET)
        .set('Content-Type', 'multipart/form-data')
    };

    return this.http.post(`${this.API_URL}/public/submit-report`, reportNotice, httpOptions);
  }

  update(id: number, reportNotice: any) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('x-api-key', this.X_API_KEY)
        .set('x-api-secret', this.X_API_SECRET)
        .set('Content-Type', 'multipart/form-data')
    };

    return this.http.put(`${this.API_URL}/${id}`, reportNotice, httpOptions);
  }

  delete(id: number) {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('x-api-key', this.X_API_KEY)
        .set('x-api-secret', this.X_API_SECRET)
        .set('Content-Type', 'multipart/form-data')
    };

    return this.http.delete(`${this.API_URL}/${id}`, httpOptions);
  }
}
