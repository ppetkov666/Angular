import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { actorCreationDTO, actorDTO } from '../actors.model';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  model: actorDTO = { 
    id: 1,
    name: 'Test name one', 
    dateOfBirth: new Date(), 
    picture: '/assets/batman.jpg', 
    biography: "just default test biography",
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      //alert(params['id']);
    });
  }

  saveChanges(actorsCreationDTO: actorCreationDTO) {
    console.log(actorsCreationDTO);
  }

}
