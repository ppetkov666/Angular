import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstLetterUppercase } from 'src/app/validators/firstLetterUpperCase';
import { EventEmitter } from '@angular/core';
import { genreCreationDTO } from '../genres.models';

@Component({
  selector: 'app-form-genre',
  templateUrl: './form-genre.component.html',
  styleUrls: ['./form-genre.component.css']
})
export class FormGenreComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form!: FormGroup;
  @Output()
  onSaveChanges: EventEmitter<genreCreationDTO> = new EventEmitter<genreCreationDTO>();

  @Input()
  model: genreCreationDTO | undefined;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            firstLetterUppercase(),
          ]
        }]
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  getErrorMessageFieldName() {
    const field = this.form.get('name');
    if (field?.hasError('required')) {
      return 'The name field is required';
    }
    if (field?.hasError('minlength')) {
      return 'Minimum legth: 3 chars';
    }
    if (field?.hasError('firstLetterUppercase')) {
      return field.getError('firstLetterUppercase').message;
    }
    return '';
  }

  saveChanges() {
    this.onSaveChanges.emit(this.form.value);
  }

}
