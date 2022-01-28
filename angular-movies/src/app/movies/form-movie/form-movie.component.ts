import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  nonSelectedGenres: MultipleSelectorModel[] = [
    { key: 1, value: "action" },
    { key: 2, value: "comedy" },
    { key: 3, value: "horror" }
  ];

  selectedGenres: MultipleSelectorModel[] = [];

  nonSelectedMovieTheaters: MultipleSelectorModel[] = [
    { key: 1, value: "Stara Zagora" },
    { key: 2, value: "Plovdiv" },
    { key: 3, value: "Sofia" }
  ];

  selectedMovieTheaters: MultipleSelectorModel[] = [];

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

    this.onSaveChanges.emit(this.form.value);
  }
  onImageSelect(file: File) {
    this.form.get('poster')?.setValue(file);

  }

  changeMarkDown(content: string) {
    this.form.get('summary')?.setValue(content);

  }

}
