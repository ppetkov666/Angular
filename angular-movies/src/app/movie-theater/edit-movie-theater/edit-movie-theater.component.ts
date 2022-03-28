import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieTheatersService } from 'src/app/movie-theaters/movie-theaters.service';
import { movieTheatersCreationDTO, movieTheatersDTO } from '../movie-theater.model';

@Component({
  selector: 'app-edit-movie-theater',
  templateUrl: './edit-movie-theater.component.html',
  styleUrls: ['./edit-movie-theater.component.css']
})
export class EditMovieTheaterComponent implements OnInit {

  constructor(
    private movieTheatersService: MovieTheatersService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }


  model!: movieTheatersDTO;

  ngOnInit(): void {
  
    this.activatedRoute.params.subscribe((params) => {
      this.movieTheatersService.getById(params['id']).subscribe((data)=>{
        this.model = data;
      })
      //alert(params["id"])
    })
  }

  saveChanges(data: movieTheatersCreationDTO) {
    this.movieTheatersService.edit(this.model.id, data).subscribe(()=>{
      return this.router.navigate(['/movietheater']);
    });
  }

}
