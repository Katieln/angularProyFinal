import { Injectable } from "@angular/core";
import { loginPayload } from "../../modules/auth/models/auth.model";
import { BehaviorSubject, map, Observable } from "rxjs";
import { User } from "../../modules/dashboard/pages/users/models/users.model";
import { generateRandomString } from "../../shared/utils";
import { environment } from "../../../environments/environment.development";
import { AuthActions } from "../../store/auth.actions";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectAuthUser } from "../../store/auth.selectors";





@Injectable({ providedIn: 'root' })
export class AuthService {
  authUser$: Observable<User | null>;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store
  ) {
    this.authUser$ = this.store.select(selectAuthUser);
  }

  get isAdmin$(): Observable<boolean> {
    return this.authUser$.pipe(map((x) => x?.role === 'ADMIN'));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.store.dispatch(AuthActions.unsetAuthUser());
    this.router.navigate(['auth', 'login']);
  }

  login(payload: loginPayload, next?: () => void): void {
    this.httpClient
      .get<User[]>(
        `${environment.baseApiURL}/users?email=${payload.email}&password=${payload.password}`
      )
      .subscribe({
        next: (usersResult) => {
          if (!usersResult[0]) {
            alert('Email o password invalidos');
          } else {
            // Si login es satisfactorio
            localStorage.setItem('access_token', usersResult[0].accessToken);
            this.store.dispatch(
              AuthActions.setAuthUser({ user: usersResult[0] })
            );
            this.router.navigate(['dashboard', 'home']);
          }

          if (!!next) {
            next();
          }
        },
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              alert('El servidor esta caido');
            }
          }
        },
      });

  }

  isAuthenticated(): Observable<boolean> {

    return this.httpClient
      .get<User[]>(
        `${environment.baseApiURL}/users?accessToken=${localStorage.getItem(
          'access_token'
        )}`
      )
      .pipe(
        map((res) => {
          const userResult = res[0];
          if (userResult) {
            this.store.dispatch(AuthActions.setAuthUser({ user: userResult }));
          }
          return !!userResult;
        })
      );
  }
}
