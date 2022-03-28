import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MoviesService } from 'src/app/movie/movies.service';


@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {    
  }
  //title = 'angular-movies';
  @Input()
  movies: any[] | undefined;
   @Output()
   onDelete = new EventEmitter<void>();

  remove(id: number) {    
    this.moviesService.delete(id).subscribe(()=> {
        this.onDelete.emit();
    });
  }
}
