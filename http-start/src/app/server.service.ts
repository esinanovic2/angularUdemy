import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs-compat/add/operator/map';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ServerService {

  constructor(private http: Http) {}

  // storeServers(servers: any[]) {
  //   const header = new Headers({'Content-type': 'application/json'});
  //   return this.http.post('https://udemyangular-bc216.firebaseio.com/data.json',
  //     servers, {headers: header});
  // }

  storeServers(servers: any[]) {
    const header = new Headers({'Content-type': 'application/json'});
    return this.http.put('https://udemyangular-bc216.firebaseio.com/data.json',
      // @ts-ignore
      servers, {headers: header});
  }

  getServers() {

    return this.http.get('https://udemyangular-bc216.firebaseio.com/data')
      .map(
        // @ts-ignore
        (response: Response) => {
          const data = response.json();
          // @ts-ignore
          for (const server of data) {
            server.name = 'FETCHED_' + server.name;
          }
          return data;
        }
      )
      .pipe(
        catchError(error => {
          return throwError('Something went wrong');
        })
      );
  }

  getAppName() {

    return this.http.get('https://udemyangular-bc216.firebaseio.com/appName.json')
    // @ts-ignore
      .map((response: Response) => {
        return response.json();
      });
  }
}
