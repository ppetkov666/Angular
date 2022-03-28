import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/movie/movies.service';
import { MultipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { movieCreationDTO } from '../movies.model';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  constructor(private moviesService: MoviesService, private router: Router) { }


  nonSelectedGenres: MultipleSelectorModel[] = [];
  nonSelectedMovieTheaters: MultipleSelectorModel[] = [];

  ngOnInit(): void {
    this.moviesService.postGet().subscribe((responseData) => {
      this.nonSelectedGenres = responseData.genres.map(genre => {
        return <MultipleSelectorModel>{ key: genre.id, value: genre.name }
      });

      this.nonSelectedMovieTheaters = responseData.movieTheaters.map(movieTheater => {
        return <MultipleSelectorModel>{ key: movieTheater.id, value: movieTheater.name }
      });
    })
  }

  saveChanges(data: movieCreationDTO) {
    console.log(data);

    this.moviesService.create(data).subscribe((id) => {
      this.router.navigate(['/movie/'+ id])
    })
  }

}
