import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaticsticsByMonthService {
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  staticsticsByMonth(id: number | undefined): Observable<any> {
    return this.http.get(this.API_URL + `/statisticsByMonth/${id}`);
  }
}
