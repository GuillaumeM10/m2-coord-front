import { Question } from '../../models/questions.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { historicalFigureQuestionsMock } from '../../../mocks/historical-figure-questions.mock';

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  private http: HttpClient = inject(HttpClient);
  private url = 'https://localhost:3000/questions'; // Replace with your actual API endpoint

  getQuestions(id: string): Observable<Question[]> {
    console.log(`Fetching questions for ID: ${id}`);
    //return this.http.get<Question[]>(this.url + `/${id}`);
    return of(historicalFigureQuestionsMock);
  }
}
