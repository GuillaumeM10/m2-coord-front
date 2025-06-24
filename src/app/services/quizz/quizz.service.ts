import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { QuestionModel } from '@app/models/question.model';

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

  answerIsCorrect(answer: {
    questionId: string;
    answer: string;
  }): Observable<{ isAnswerCorrect: boolean }> {
    return this.http.post<{ isAnswerCorrect: boolean }>(`${this.url}/answers/validate`, answer);
  }
}
