import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { gameData } from 'src/app/shared/interfaces/data';
import { catchError, throwError } from 'rxjs';

const GAME_DATA_API_URL = 'https://happy-moss-00cc46503.5.azurestaticapps.net';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  http: HttpClient = inject(HttpClient);

  getGameData() {
    return this.http.get<gameData>(GAME_DATA_API_URL, {
      headers: {        
        Accept: 'application/json',
      },
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
