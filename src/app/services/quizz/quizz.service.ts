import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { historicalFigureQuestionsDataMock } from '@mocks/data/historical-figure-questions.data.mock';
import {QuestionModelMock} from '@mocks/models/question.model.mock';

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  private http: HttpClient = inject(HttpClient);
  private url = 'https://localhost:3000/questions'; // Replace with your actual API endpoint

  getQuestions(id: string): Observable<QuestionModelMock[]> {
    console.log(`Fetching questions for ID: ${id}`);
    //return this.http.get<Question[]>(this.url + `/${id}`);
    return of(historicalFigureQuestionsDataMock);
  }
}
