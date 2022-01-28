import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // setTimeout(() => {
    //   this.movies = [{
    //     title: 'Spiderman',
    //     date: new Date('2015-11-11'),
    //     price: 12.99
    //   }, {
    //     title: 'Batman',
    //     date: new Date('2016-11-11'),
    //     price: 13.99
    //   }, {
    //     title: 'joker',
    //     date: new Date('2017-11-11'),
    //     price: 14.99
    //   },]
    // }, 2000);


  }
  title = 'angular-movies';
  @Input()
  movies: any[] | undefined;


  remove(index: number) {
    this.movies?.splice(index, 1);
  }
}
