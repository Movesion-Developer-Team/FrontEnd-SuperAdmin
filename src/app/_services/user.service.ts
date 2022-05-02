import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from '../models/Player';



const API_URL = 'https://localhost:7098/Player';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  






















  constructor(private http: HttpClient) { }


  
  getAll() {
    return this.http.get<Player[]>( API_URL);
}

getById(id: string) {
    return this.http.get<Player>(`${API_URL}/${id}`);
}

create(params: any) {
    return this.http.post(API_URL, params);
}

update(id: string, params: any) {
    return this.http.put(`${API_URL}/${id}`, params);
}

delete(id: string) {
    return this.http.delete(`${API_URL}/${id}`);
}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
