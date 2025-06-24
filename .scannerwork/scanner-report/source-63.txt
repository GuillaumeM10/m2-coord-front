import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameDto } from '@api/models/game-dto';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private apiUrl = `${environment.apiUrl}/games`;

  constructor(private http: HttpClient) {}

  getGames(): Observable<GameDto[]> {
    return this.http.get<GameDto[]>(this.apiUrl);
  }
}
