import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utils';
import { actorCreationDTO, actorDTO } from './actors.model';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiURL + '/actors';


  //page: number, recordsPerPage: number
  get(): Observable<any>{

    let params = new HttpParams();
    //params = params.append('page', page.toString(),);
    //params = params.append('recordsPerPage', recordsPerPage.toString());

    return this.http.get<actorDTO[]>(this.apiUrl,{observe: 'response'});
  }

  create(actor: actorCreationDTO) {
    const formData = this.buildFormdata(actor);
    return this.http.post(this.apiUrl,formData)
  }

  private buildFormdata(actor: actorCreationDTO): FormData {
    const formData = new FormData();
    formData.append('name', actor.name);

    if (actor.biography) formData.append('biography', actor.biography)
    //if (actor.dateOfBirth) formData.append('actopr', actor.dateOfBirth)

      if(actor.dateOfBirth){
        formData.append('dateOfBirth', formatDateFormData(actor.dateOfBirth))
      }

      if(actor.picture){
        formData.append('picture', actor.picture)

      }
    return formData;
  }
}