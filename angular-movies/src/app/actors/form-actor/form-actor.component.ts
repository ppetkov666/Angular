import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreationDTO, actorDTO } from '../actors.model';


@Component({
  selector: 'app-form-actor',
  templateUrl: './form-actor.component.html',
  styleUrls: ['./form-actor.component.css']
})
export class FormActorComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }


  form!: FormGroup;

  @Input()
  model!: actorDTO;
  //both approaches works: model!: actorDTO |undefined;
  

  @Output()
  onSaveChanges = new EventEmitter<actorCreationDTO>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', { validators: [Validators.required,] }],
      dateOfBirth: '',
      picture: '',
      biography: '',
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }
  saveChanges() {
    this.onSaveChanges.emit(this.form.value);
  }

  onImageSelect(imageSelected: File) {
    this.form.get('picture')?.setValue(imageSelected);
  }

  changeMarkDown(content: string) {
    this.form.get('biography')?.setValue(content);
  }

}
