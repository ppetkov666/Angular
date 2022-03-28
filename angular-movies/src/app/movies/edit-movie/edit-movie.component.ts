import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorsMovieDTO } from 'src/app/actors/actors.model';
import { MoviesService } from 'src/app/movie/movies.service';
import { MultipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { movieCreationDTO, movieDTO } from '../movies.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  constructor(
    private moviesService: MoviesService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  @Input()
  model!: movieDTO;
  selectedGenres: MultipleSelectorModel[] = [];
  nonSelectedGenres: MultipleSelectorModel[] = [];
  selectedMovieTheaters: MultipleSelectorModel[] = [];
  nonSelectedMovieTheaters: MultipleSelectorModel[] = [];
  selectedActors!: actorsMovieDTO[];



  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.moviesService.putGet(params['id']).subscribe(m=> {
        this.model = m.movie;

        this.selectedGenres = m.selectedGenres.map(genre => {
          return <MultipleSelectorModel>{ key: genre.id, value: genre.name }
        });
        this.nonSelectedGenres = m.nonSelectedGenres.map(genre => {
          return <MultipleSelectorModel>{ key: genre.id, value: genre.name }
        });
        this.selectedMovieTheaters = m.selectedMovieTheaters.map(movieTheater => {
          return <MultipleSelectorModel>{ key: movieTheater.id, value: movieTheater.name }
        });
        this.nonSelectedMovieTheaters = m.nonSelectedMovieTheaters.map(movieTheater => {
          return <MultipleSelectorModel>{ key: movieTheater.id, value: movieTheater.name }
        });

        this.selectedActors = m.actors;

      })
    })
  }

  saveChanges(data: movieCreationDTO) {
    
    this.moviesService.edit(this.model.id, data).subscribe(data=> {      
      this.router.navigate(['/movie/'+ this.model.id])
    });
  }

}
