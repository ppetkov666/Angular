import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movieTheatersCreationDTO, movieTheatersDTO } from '../movie-theater.model';

@Component({
  selector: 'app-edit-movie-theater',
  templateUrl: './edit-movie-theater.component.html',
  styleUrls: ['./edit-movie-theater.component.css']
})
export class EditMovieTheaterComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }


  model: movieTheatersDTO = { name: 'New test movie', latitude: 42.42600545323401, longitude: 385.631421090875 };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      //alert(params["id"])
    })
  }

  saveChanges(data: movieTheatersCreationDTO) {
    console.log(data)
  }

}
