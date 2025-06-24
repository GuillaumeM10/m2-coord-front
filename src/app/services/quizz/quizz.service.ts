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

  getQuestions(id: string): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(`${environment.apiUrl}/${id}`);
  }

  getCorrectAnswer(questionId: string): Observable<{ correctAnswer: string }> {
    return this.http.get<{ correctAnswer: string }>(
      `${environment.apiUrl}/answers/correct/${questionId}`,
    );
  }
}
