import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
// import { fakeMovies } from '../fake-movies';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMoviesFromService();
  }

  movies: Movie[];

  getMoviesFromService(): void {
    this.movieService.getMovies().subscribe(
      updatedMovies => this.movies = updatedMovies        
    );
  }

  // add new movie
  add(name: string, releaseYear: string): void {
    name = name.trim();
    if (Number.isNaN(Number(releaseYear)) || !name || Number(releaseYear) === 0) {
      alert('Name must not be blank, Release year must be a number');
      return;
    }
    const newMovie:Movie = new Movie();
    newMovie.name = name;
    newMovie.releaseYear = Number(releaseYear);
    this.movieService.addMovie(newMovie).subscribe(
      insertedMovie => this.movies.push(insertedMovie)
    );
  }

}
