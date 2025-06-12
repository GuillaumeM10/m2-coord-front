import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Game } from '../models/game.model';
import { environment } from '../../environements/environement';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private apiUrl = `${environment.apiUrl}/games`;

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    // Remplace l'appel HTTP par un mock temporaire :
    const mockGames: Game[] = [
      {
        id: '1',
        name: 'Quiz sur les pays',
        photoUrl: 'https://source.unsplash.com/random/800x600?flags',
        modes: ['Facile', 'Intermédiaire', 'Difficile'],
      },
      {
        id: '2',
        name: 'Reconnaissance d’animaux',
        photoUrl: 'https://source.unsplash.com/random/800x600?animals',
        modes: ['Classique', 'Chrono', 'Expert'],
      },
      {
        id: '3',
        name: 'Culture Générale',
        photoUrl: 'https://source.unsplash.com/random/800x600?quiz',
        modes: ['Débutant', 'Avancé', 'Maître'],
      },
    ];

    //return of(mockGames);
    // Pour utiliser l'API réelle plus tard :
    return this.http.get<Game[]>(this.apiUrl);
  }
}
