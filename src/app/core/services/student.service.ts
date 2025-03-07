import { Injectable } from "@angular/core";
import { generateRandomString } from "../../shared/utils";
import { Student } from "../../modules/dashboard/pages/students/models";
import { concatMap, Observable } from "rxjs";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment.development";


@Injectable({providedIn:'root'})

export class StudentService {

  constructor(private httpClient: HttpClient){}

getStudents(): Observable<Student[]> {

      const myHeaders = new HttpHeaders().append(
        'Authorization',
        localStorage.getItem('access_token') || ''
      );
      return this.httpClient.get<Student[]>(`${environment.baseApiURL}/students`, {
        headers: myHeaders,
      });
    }


    getStudentDetail(id: string): Observable<Student> {
        return this.httpClient.get<Student>(
          `${environment.baseApiURL}/students/${id}?_embed=teachers`
        );
      }


    createStudent ( payload : {name: string}): Observable <Student[]> {
        return this.httpClient.post <Student>( `${environment.baseApiURL}/students`,  payload )
        .pipe(concatMap(()=>this.getStudents()))


    }

    deleteStudentByID(id: string): Observable <Student[]>{
        return this.httpClient.delete <Student>( `${environment.baseApiURL}/students/${id}` )
        .pipe(concatMap(()=>this.getStudents()))



    }

    updateStudentById(id: string, data: { name: string }): Observable<Student[]> {
        return this.httpClient
          .patch<Student>(`${environment.baseApiURL}/students/${id}`, data)
          .pipe(concatMap(() => this.getStudents()));

      
      }
    



    }



