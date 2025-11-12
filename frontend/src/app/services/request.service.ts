import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequestService {
  private apiUrl = 'http://localhost:3000/api/requests';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(request: any): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  updateStatus(id: string, data: { status: string; comment?: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  getHistory(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/history`);
  }

  getNotifications(user: string) {
    return this.http.get<any[]>(`${this.apiUrl.replace('/requests', '')}/notifications/${user}`);
  }


}
