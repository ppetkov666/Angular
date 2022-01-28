import { Component, OnInit } from '@angular/core';
import { movieCreationDTO } from '../movies.model';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  saveChanges(data: movieCreationDTO) {
    console.log(data);
  }

}
