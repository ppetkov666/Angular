import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movie/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    
    this.loadData()
  }

  moviesInTheaters: any[] = [];
  futureReleases: any[] = [];

  loadData(){
    this.moviesService.getHomePageMovies().subscribe(m => {
      this.futureReleases = m.upcomingReleases;
      this.moviesInTheaters = m.inTheaters;      
    });
  }

  onDelete(){
    this.loadData();
  }

}
