import { Component, OnInit } from '@angular/core';
import { movieTheatersCreationDTO } from '../movie-theater.model';

@Component({
  selector: 'app-create-movie-teather',
  templateUrl: './create-movie-teather.component.html',
  styleUrls: ['./create-movie-teather.component.css']
})
export class CreateMovieTheaterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  saveChanges(data: movieTheatersCreationDTO) {
    console.log(data)

  }
}
