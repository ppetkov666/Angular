import { Component, OnInit } from '@angular/core';
import { MovieTheatersService } from 'src/app/movie-theaters/movie-theaters.service';
import { movieTheatersDTO } from '../movie-theater.model';

@Component({
  selector: 'app-index-movie-teather',
  templateUrl: './index-movie-theater.component.html',
  styleUrls: ['./index-movie-theater.component.css']
})
export class IndexMovieTheaterComponent implements OnInit {

  constructor(private movieTheatersService: MovieTheatersService) { }

  movieTheaters: movieTheatersDTO[] = [];
  ConvertedmovieTheaters: movieTheatersDTO[] = [];

  displayColumns = ['id','name', 'actions'];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.movieTheatersService.get().subscribe((data) => {
      this.movieTheaters = data      
    }
    );
  }

  delete(id: number) {
    this.movieTheatersService.delete(id).subscribe(()=> this.loadData())
  }

}
