import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-actors-autocomplete',
  templateUrl: './actors-autocomplete.component.html',
  styleUrls: ['./actors-autocomplete.component.css']
})
export class ActorsAutocompleteComponent implements OnInit {

  constructor() { }

  control: FormControl = new FormControl();
  actors = [
    { name: 'Brad Pitt', picture: "/assets/bradPitt.jpg" },
    { name: 'Silvester Stalone', picture: "/assets/stalone.jpg" },
    { name: 'johny Depp', picture: "/assets/depp.jpg" },
  ]

  selectedActors: any = [];
  originalActors = this.actors;

  columnsToDisplay = ['picture', 'name', 'character', 'actions'];

  @ViewChild(MatTable) table: MatTable<any> | undefined;

  ngOnInit(): void {
    this.control.valueChanges.subscribe(value => {
      this.actors = this.originalActors;
      this.actors = this.actors.filter(actor => actor.name.indexOf(value) !== -1);
    });
  }

  optionSelected(data: MatAutocompleteSelectedEvent) {
    console.log(data.option.value)
    this.selectedActors.push(data.option.value);
    this.control.patchValue('');
    if (this.table !== undefined) {
      this.table.renderRows();
    }
  }

  remove(actor: any) {
    const index = this.selectedActors.findIndex((i: { name: any; }) => i.name === actor.name);
    this.selectedActors.splice(index, 1);
    this.table?.renderRows();

  }

  dropped(event: CdkDragDrop<any[]>) {
    const previousIndex = this.selectedActors.findIndex((actor: any) => actor === event.item.data);
    moveItemInArray(this.selectedActors, previousIndex, event.currentIndex);
    this.table?.renderRows();
  }

}
