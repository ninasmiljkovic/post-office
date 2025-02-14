import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { PostOffice } from '../types/postoffice.model';

@Injectable({
  providedIn: 'root'
})
export class PostOfficeService {
  private apiUrl = 'http://localhost:4000/postoffices';

  constructor(private http: HttpClient) {}

  getPostOffices(): Observable<PostOffice[]> {
    return this.http.get<PostOffice[]>(this.apiUrl);
  }

  getPostOfficeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createPostOffice(postOffice: PostOffice): Observable<PostOffice> {
    return this.http.post<PostOffice>(this.apiUrl, postOffice);
  }

  updatePostOffice(id: string, postOffice: PostOffice): Observable<PostOffice> {
    return this.http.patch<PostOffice>(`${this.apiUrl}/${id}`, postOffice);
  }

  deletePostOffice(id: string): Observable<PostOffice> {
    return this.http.delete<PostOffice>(`${this.apiUrl}/${id}`);
  }
}
