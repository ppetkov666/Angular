import { HttpClient, HttpParams } from '@angular/common/http';
import { BuiltinFunctionCall } from '@angular/compiler/src/compiler_util/expression_converter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { homeDto, movieCreationDTO, movieDTO, moviePostgetDto, moviePutgetDto } from '../movies/movies.model';
import { formatDateFormData } from '../utilities/utils';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiURL + '/movies'


  public getHomePageMovies(): Observable<homeDto> {
    return this.http.get<homeDto>(`${this.apiUrl}`);
  }

  public putGet(id: number): Observable<moviePutgetDto> {
    return this.http.get<moviePutgetDto>(`${this.apiUrl}/putget/${id}`)
  }

  public edit(id: number, movieCreationDto: movieCreationDTO) {
    const formData = this.buildFormData(movieCreationDto)
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  public delete(id: number) {    
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  public postGet(): Observable<moviePostgetDto> {
    return this.http.get<moviePostgetDto>(`${this.apiUrl}/postget`);
  }

  public create(movieCreationDto: movieCreationDTO): Observable<number>{
    const formData = this.buildFormData(movieCreationDto);
    return this.http.post<number>(this.apiUrl, formData);
  }

  public getById(id: number): Observable<movieDTO> {
    return this.http.get<movieDTO>(`${this.apiUrl}/${id}`);
  }

  public filter(values: any): Observable<any>{
    const params = new HttpParams({fromObject: values});
    return this.http.get<movieDTO[]>(`${this.apiUrl}/filter`, {params: params, observe: 'response'});
  }



  private buildFormData(movie: movieCreationDTO): FormData {
    const formData = new FormData();
    formData.append('title', movie.title);
    formData.append('summary', movie.summary);
    formData.append('trailer', movie.trailer);
    formData.append('inTheaters', String(movie.inTheaters));
    if (movie.releaseDate) {
      formData.append('releaseDate', formatDateFormData(movie.releaseDate));
    }
    if (movie.poster) {
      formData.append('poster', movie.poster);
    }
    formData.append('genresIds', JSON.stringify(movie.genresIds));
    formData.append('movieTheatersIds', JSON.stringify(movie.movieTheatersIds));
    formData.append('actors', JSON.stringify(movie.actors));

    return formData;
  }



}
