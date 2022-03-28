import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { movieTheatersCreationDTO, movieTheatersDTO } from '../movie-theater/movie-theater.model';

@Injectable({
  providedIn: 'root'
})
export class MovieTheatersService {

  constructor(private http: HttpClient) {     
  }

  private apiUrl = environment.apiURL + "/movietheaters"

  public get(): Observable<movieTheatersDTO[]>{
    return this.http.get<movieTheatersDTO[]>(this.apiUrl);
  }

  public getById(id:Number): Observable<movieTheatersDTO>{
    return this.http.get<movieTheatersDTO>(`${this.apiUrl}/${id}`)
  }

  public create (movieTheaterDto: movieTheatersCreationDTO): Observable<any>{
    return this.http.post(this.apiUrl, movieTheaterDto);
  }

  public edit(id:number, movieTheaterDto: movieTheatersCreationDTO){
    return this.http.put(`${this.apiUrl}/${id}`, movieTheaterDto);
  }

  public delete(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
