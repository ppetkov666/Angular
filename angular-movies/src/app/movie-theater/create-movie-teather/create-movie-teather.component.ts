import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieTheatersService } from 'src/app/movie-theaters/movie-theaters.service';
import { movieTheatersCreationDTO } from '../movie-theater.model';

@Component({
  selector: 'app-create-movie-teather',
  templateUrl: './create-movie-teather.component.html',
  styleUrls: ['./create-movie-teather.component.css']
})
export class CreateMovieTheaterComponent implements OnInit {

  constructor(private MovieTheatersService: MovieTheatersService, private router: Router) { }

  ngOnInit(): void {
  }

  saveChanges(data: movieTheatersCreationDTO) {
    this.MovieTheatersService.create(data).subscribe(() => {           
        this.router.navigate(['/movietheater'])
    })

  }
}
