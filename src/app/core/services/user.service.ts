import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { UserActions } from "../../modules/dashboard/pages/users/store/user.actions";
import { concatMap, Observable } from "rxjs";
import { User } from "../../modules/dashboard/pages/users/models/users.model";
import { environment } from "../../../environments/environment.development";

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private httpClient: HttpClient, private store: Store) {}


  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  deleteUserById(id: string) {
    this.store.dispatch(UserActions.deleteUserById({ id }));
  }

  resetUserState(): void {
    this.store.dispatch(UserActions.resetState());
  }

  getUsers(): Observable<User[]> {
        // return of([...MY_FAKE_DATABASE]).pipe(delay(300));
        const myHeaders = new HttpHeaders().append(
          'Authorization',
          localStorage.getItem('access_token') || ''
        );
        return this.httpClient.get<User[]>(`${environment.baseApiURL}/Users`, {
          headers: myHeaders,
        });
      }


  createUser ( payload : {name: string}): Observable <User[]> {
          return this.httpClient.post <User>( `${environment.baseApiURL}/Users`,  payload )
          .pipe(concatMap(()=>this.getUsers()))

      }

      updateUserById(id: string, data: { name: string }): Observable<User[]> {
              return this.httpClient
                .patch<User>(`${environment.baseApiURL}/Users/${id}`, data)
                .pipe(concatMap(() => this.getUsers()));            
            }

        deleteUserByID(id: string): Observable <User[]>{
            return this.httpClient.delete <User>( `${environment.baseApiURL}/Users/${id}` )
            .pipe(concatMap(()=>this.getUsers()))
    

        }
}
