import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

  movies: Movie[] = [];
  getMovies(): void {
    this.movieService.getMovies().subscribe(
      movies => this.movies = movies.slice(1, 5)
    );
  }

}
