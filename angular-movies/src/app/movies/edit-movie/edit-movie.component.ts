import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movieCreationDTO, movieDTO } from '../movies.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  @Input()
  model: movieDTO = {
    title: 'test Movie',
    summary: 'test summary',
    poster: '/assets/spiderman.jpg',
    inTheaters: true,
    releaseDate: new Date(),
    trailer: 'test trailer'
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      //alert(params["id"])
    })
  }

  saveChanges(data: movieCreationDTO) {

  }

}
