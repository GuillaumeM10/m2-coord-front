import { Question } from '../../models/questions.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environements/environement';
import { Answer } from '../../models/answer.model';

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  private http: HttpClient = inject(HttpClient);
  private url = environment.apiUrl; // Replace with your actual API endpoint

  getQuestions(id: string): Observable<Question[]> {
    console.log(`Fetching questions for ID: ${id}`);
    return this.http.get<Question[]>(this.url + `/${id}`);
  }

  answerIsCorrect(answer: Answer): Observable<{ isAnswerCorrect: boolean }> {
    return this.http.post<{ isAnswerCorrect: boolean }>(`${this.url}/answers/validate`, answer);
  }
}
