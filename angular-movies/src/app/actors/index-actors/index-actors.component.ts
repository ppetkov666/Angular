import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { actorDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-index-actors',
  templateUrl: './index-actors.component.html',
  styleUrls: ['./index-actors.component.css']
})
export class IndexActorsComponent implements OnInit {

  constructor(private actorsService: ActorsService) { }

  actors: actorDTO[] = [];
  columnsToDisplay = ['name', 'actions'];
  totalAmountOfRecords: any;
  currentPage = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadData();
  }
  //this.currentPage, this.pageSize
  loadData() {
    this.actorsService.get().subscribe((response: HttpResponse<actorDTO[]>) => {
      this.actors = response.body!;
      this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
    }
    )
  }

  delete() {



  }

}
