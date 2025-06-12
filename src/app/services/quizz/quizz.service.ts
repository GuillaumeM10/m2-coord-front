import { Question } from '../../models/questions.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  private http: HttpClient = inject(HttpClient);
  private url = 'https://localhost:3000/questions'; // Replace with your actual API endpoint
  constructor() {
    // Initialize the service if needed
  }

  // Add methods to fetch quizzes, handle answers, etc.
  getQuestions(id: string): Observable<Question[]> {
    // This method should return questions based on the quiz id
    // For example, it could fetch data from an API or a local JSON file
    return this.http.get<Question[]>(this.url + `/${id}`);
  }
}
