import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/movie/movies.service';
import { coordinatesMapWithMessage } from 'src/app/utilities/map/coordinates';
import { RatingService } from 'src/app/utilities/rating.service';
import Swal from 'sweetalert2';
import { movieDTO } from '../movies.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private ratingService: RatingService
  ) { }


  movie?: movieDTO;
  releaseDate?: Date;
  trailerUrl?: SafeResourceUrl;
  coordinatesMap: coordinatesMapWithMessage[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.moviesService.getById(params['id']).subscribe((movie) => {
        this.movie = movie;
        this.releaseDate = new Date(movie.releaseDate);
        this.trailerUrl = this.generateYouTubeUrlForEmbeddedVideo(movie.trailer)
        this.coordinatesMap = movie.movieTheaters.map(m => {
          return { latitude: m.latitude, longitude: m.longitude, message: m.name }
        })

        console.log(this.coordinatesMap)
      })
    })
  }

  generateYouTubeUrlForEmbeddedVideo(url: any): SafeResourceUrl {
    if (!url) {
      return '';
    }
    //https://www.youtube.com/watch?v=JfVOs4VSpmA
    let videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  onRating(rate: number) {
    this.ratingService.rate(this.movie!.id, rate).subscribe(() => {
      Swal.fire("Success", "Your vote has been received", "success");
    });
  }

}
