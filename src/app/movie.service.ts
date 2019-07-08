import { Injectable } from '@angular/core';
import { fakeMovies } from './fake-movies';
import { Movie } from '../models/movie';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(public messageService: MessageService) { }

  getMovies(): Observable<Movie[]> {
    this.messageService.add(`${new Date().toLocaleString()} . Get movie list`);
    return of(fakeMovies);
  }

}
