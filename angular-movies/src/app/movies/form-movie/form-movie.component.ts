import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorsMovieDTO } from 'src/app/actors/actors.model';
import { MultipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';

import { movieCreationDTO, movieDTO } from '../movies.model';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.css']
})
export class FormMovieComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form!: FormGroup;

  @Input()
  model!: movieDTO;

  @Output()
  onSaveChanges = new EventEmitter<movieCreationDTO>();

  @Input()
  nonSelectedGenres: MultipleSelectorModel[] = []

  @Input()
  selectedGenres: MultipleSelectorModel[] = [];
  @Input()
  nonSelectedMovieTheaters: MultipleSelectorModel[] = [];

  @Input()
  selectedMovieTheaters: MultipleSelectorModel[] = [];

  @Input()
  selectedActors: actorsMovieDTO[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', { validators: [Validators.required,] }],
      summary: '',
      inTheaters: false,
      trailer: '',
      releaseDate: '',
      poster: '',
      genresIds: '',
      movieTheatersIds: '',
      actors: ''
    })

    if (this.model !== undefined) {
      this.form.patchValue(this.model)
    }

  }

  saveChanges() {
    const genresId = this.selectedGenres.map(value => value.key);
    const movieTheatersId = this.selectedMovieTheaters.map(value => value.key);

    this.form.get('genresIds')?.setValue(genresId);
    this.form.get('movieTheatersIds')?.setValue(movieTheatersId);

    const actors = this.selectedActors.map( actor => {
      return {id: actor.id, character: actor.character}
    });
    
    this.form.get('actors')?.setValue(actors);

    this.onSaveChanges.emit(this.form.value);
  }
  onImageSelect(file: File) {
    this.form.get('poster')?.setValue(file);

  }

  changeMarkDown(content: string) {
    this.form.get('summary')?.setValue(content);

  }

}
