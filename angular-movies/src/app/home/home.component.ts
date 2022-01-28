import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.moviesInTheaters = [{
      title: 'Spiderman',
      date: new Date('2015-11-11'),
      price: 12.99,
      poster: "/assets/spiderman.jpg"

    }, {
      title: 'Joker',
      date: new Date('2016-11-11'),
      price: 13.99,
      poster: '/assets/joker.jpg'
    },]

    // this.futureReleases = [{
    //   title: 'FutureOne',
    //   date: new Date('2015-11-11'),
    //   price: 12.99
    // }, {
    //   title: 'FutureTwo',
    //   date: new Date('2016-11-11'),
    //   price: 13.99
    // }, {
    //   title: 'FutureThree',
    //   date: new Date('2017-11-11'),
    //   price: 14.99
    // },]
    this.futureReleases = [];

  }

  moviesInTheaters: any;
  futureReleases: any;

}
