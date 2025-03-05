import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { UserActions } from "../../modules/dashboard/pages/users/store/user.actions";

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private httpClient: HttpClient, private store: Store) {}

//   getStudentUsers(): Observable<User[]> {
//     return this.httpClient.get<User[]>(
//       `${environment.baseApiUrl}/users?role=STUDENT`
//     );
//   }

  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  deleteUserById(id: string) {
    this.store.dispatch(UserActions.deleteUserById({ id }));
  }

  resetUserState(): void {
    this.store.dispatch(UserActions.resetState());
  }
}
