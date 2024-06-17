import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';


const API_URL = `${environment.apiURL}/user`;

@Injectable({
  providedIn: 'root'
})
export class GameUserService {
  http: HttpClient = inject(HttpClient);
  private loggedInUser: { username: string; password: string } | null = null;
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private gameUsernamesSource = new BehaviorSubject<any[]>([]);
  currentGameUsernames = this.gameUsernamesSource.asObservable();
  isCreateClicked = false;
  isReadClicked = false;
  isUpdateclicked = false;  
  isDeleteClicked = false;

  login(username: string, password: string): boolean {
    // For a real application, replace this with actual validation
    if (username === 'admin' && password === '123') {
      this.loggedInUser = { username, password };
      this.loggedInSubject.next(true);
      return true;
    }
    return false;
  }

  getUser() {
    return this.loggedInUser;
  }

  logout() {
    this.loggedInUser = null;
    this.loggedInSubject.next(false);
  }

  isLoggedIn() {
    return this.loggedInSubject.asObservable();
  }

  getGameUsername(usernames: any[]) {
    this.gameUsernamesSource.next(usernames);
  }
  
  getAllGameUsernames(): Observable<any> {
    return this.http.get(`${API_URL}/all`);
  }

  setCreateClickedState(state: boolean) {
    this.isCreateClicked = state;
  }

  getCreateClickedState(): boolean {
      return this.isCreateClicked;
  }

  setUpdateClickedState(state: boolean) {
    this.isUpdateclicked = state;
  }

  getUpdateClickedState(): boolean {
      return this.isUpdateclicked;
  }

  setDeleteClickedState(state: boolean) {
    this.isDeleteClicked = state;
  }

  getDeleteClickedState(): boolean {
      return this.isDeleteClicked;
  }

  setReadClickedState(state: boolean) {
    this.isReadClicked = state;
  }

  getReadClickedState(): boolean {
      return this.isReadClicked;
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${API_URL}/get/${id}`);
  }

  deleteUserById(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/delete/${id}`);
  }

  createGameUsername(user: any): Observable<any> {
    return this.http.post(`${API_URL}/create`, user);
  }

  updateGameUsername(id: string, userData: any): Observable<any> {
    return this.http.put(`${API_URL}/update/${id}`, userData);
  }

}



