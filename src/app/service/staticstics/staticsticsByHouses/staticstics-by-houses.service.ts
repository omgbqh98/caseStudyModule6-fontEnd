import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StaticsticsByHouses} from '../../../model/staticstics/staticstics-by-houses';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticsticsByHousesService {
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  staticsticsByHouses(id: number | undefined): Observable<any> {
    return this.http.get(this.API_URL + `/statisticsByHouses/${id}`);
  }

}
