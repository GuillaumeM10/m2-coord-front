import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
import { environment } from '../../environements/environement';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private apiUrl = `${environment.apiUrl}/games`;

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }
}
