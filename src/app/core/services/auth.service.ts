import { Injectable } from "@angular/core";
import { loginPayload } from "../../modules/auth/models/auth.model";
import { BehaviorSubject } from "rxjs";
import { User } from "../../modules/dashboard/pages/users/models/users.model";
import { generateRandomString } from "../../shared/utils";

const Users_BD: User[] = [
    {
    id: generateRandomString(6),
    email: "admin@Email.com",
    password: "123456",
    name:"admin",
    role:"ADMIN",
},
{
    id: generateRandomString(6),
    email: "user@Email.com",
    password: "123456",
    name:"user",
    role:"EMPLOYEE",
},

];

@Injectable ({providedIn: 'root'})
export class AuthService {
    private _authUser$ = new BehaviorSubject(null);
    authUser$ = this._authUser$.asObservable();

login(payload: loginPayload, next?: () => void): void {



}}


