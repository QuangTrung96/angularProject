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

  movie: Movie = {
    id: 1,
    name: 'Trung',
    releaseYear: 1997
  };

  // movies = fakeMovies;
  movies: Movie[];
  // Action when select a Movie in List item
  selectedMovie: Movie;
  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
    console.log(`selectedMovie = ${JSON.stringify(this.selectedMovie)}`);
  }

  getMoviesFromService(): void {
    this.movieService.getMovies().subscribe(
      updatedMovies => this.movies = updatedMovies        
    );
  }

}
