import { Component, Input, OnInit } from '@angular/core';
import { MultipleSelectorModel } from './multiple-selector.model';

@Component({
  selector: 'app-multiple-selector',
  templateUrl: './multiple-selector.component.html',
  styleUrls: ['./multiple-selector.component.css']
})
export class MultipleSelectorComponent implements OnInit {

  constructor() { }

  @Input()
  selectedItems: MultipleSelectorModel[] = []

  @Input()
  nonSelectedItems: MultipleSelectorModel[] = []

  ngOnInit(): void {
  }

  selectAll() {
    this.selectedItems.push(...this.nonSelectedItems);
    this.nonSelectedItems = [];

  }
  deSelectAll() {
    this.nonSelectedItems.push(...this.selectedItems);
    this.selectedItems = [];
  }

  select(item: MultipleSelectorModel, index: number) {
    this.selectedItems.push(item)
    this.nonSelectedItems.splice(index, 1);

  }
  deSelect(item: MultipleSelectorModel, index: number) {
    this.nonSelectedItems.push(item)
    this.selectedItems.splice(index, 1);

  }

}
