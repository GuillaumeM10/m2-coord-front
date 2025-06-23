import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environements/environement';
import { Answer } from '../../models/answer.model';
import { QuestionModel } from '@mocks/models/question.model.mock';

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  private http: HttpClient = inject(HttpClient);
  private url = environment.apiUrl; // Replace with your actual API endpoint

  getQuestions(id: string): Observable<QuestionModel[]> {
    console.log(`Fetching questions for ID: ${id}`);
    return this.http.get<QuestionModel[]>(this.url + `/${id}`);
  }

  answerIsCorrect(answer: Answer): Observable<{ isAnswerCorrect: boolean }> {
    return this.http.post<{ isAnswerCorrect: boolean }>(`${this.url}/answers/validate`, answer);
  }
}
