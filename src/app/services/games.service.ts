import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private mockGames: Game[] = [
    {
      id: '1',
      name: 'Devine ces personnages historiques',
      photoUrl:
        'https://images.unsplash.com/photo-1601758123927-1a1a1a1a1a1a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      name: 'Devine ces drapeaux de pays',
      photoUrl:
        'https://images.unsplash.com/photo-1601758003122-1a1a1a1a1a1a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      name: 'Reconnais ces monuments célèbres',
      photoUrl:
        'https://images.unsplash.com/photo-1601757991234-1a1a1a1a1a1a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '4',
      name: 'Quiz sur les animaux sauvages',
      photoUrl:
        'https://images.unsplash.com/photo-1601757987654-1a1a1a1a1a1a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '5',
      name: 'Capitales du monde',
      photoUrl:
        'https://images.unsplash.com/photo-1601757976543-1a1a1a1a1a1a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '6',
      name: 'Logos de marques célèbres',
      photoUrl:
        'https://images.unsplash.com/photo-1601757965432-1a1a1a1a1a1a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '7',
      name: 'Quiz sur les jeux vidéo rétro',
      photoUrl:
        'https://images.unsplash.com/photo-1601757954321-1a1a1a1a1a1a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '8',
      name: 'Instruments de musique',
      photoUrl:
        'https://images.unsplash.com/photo-1601757943210-1a1a1a1a1a1a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '9',
      name: 'Plantes et fleurs',
      photoUrl:
        'https://images.unsplash.com/photo-1601757932109-1a1a1a1a1a1a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '10',
      name: 'Quiz cinéma des années 2000',
      photoUrl:
        'https://images.unsplash.com/photo-1601757921098-1a1a1a1a1a1a?auto=format&fit=crop&w=800&q=80',
    },
  ];

  getGames(): Observable<Game[]> {
    return of(this.mockGames);
  }
}
