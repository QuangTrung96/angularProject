import { Injectable } from '@angular/core';
// import { fakeMovies } from './fake-movies';
import { Movie } from '../models/movie';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesURL = 'http://localhost:3000/movies';
  constructor(
    private http: HttpClient, 
    public messageService: MessageService) {

    }

  getMovies(): Observable<Movie[]> {
    // this.messageService.add(`${new Date().toLocaleString()} . Get movie list`);
    // return of(fakeMovies);
    return this.http.get<Movie[]>(this.moviesURL).pipe(
      tap(receivedMovies => console.log(`receivedMovies = ${JSON.stringify(receivedMovies)} `)),
      catchError(error => of([]))
    );
  }

  getMovieFromId(id: number): Observable<Movie> {
    // return of(fakeMovies.find(movie => movie.id === id));
    const url = `${this.moviesURL}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(selectedMovie => console.log(`selected movie = ${JSON.stringify(selectedMovie)}`)),
      catchError(error => of(new Movie()))
    );
  }

  updateMovie(movie: Movie): Observable<any> {
    return this.http.put(`${this.moviesURL}/${movie.id}`, movie, httpOptions).pipe(
      tap(updatedMovie => console.log(`updated movie = ${JSON.stringify(updatedMovie)}`)),
      catchError(error => of(new Movie))
    );
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.moviesURL}`, movie, httpOptions).pipe(
      tap((movie: Movie) => console.log(`inserted movie = ${JSON.stringify(movie)}`)),
    );
  }

}
