import { Injectable } from "@angular/core";
import { concatMap, delay, Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";
import { Teacher } from "../../modules/dashboard/pages/teachers/models/teacher.model";



@Injectable ({ providedIn: 'root' })

export class TeacherService {


    constructor(private httpClient: HttpClient){}

    
    getTeachers(): Observable<Teacher[]> {
        const myHeaders = new HttpHeaders().append(
          'Authorization',
          localStorage.getItem('access_token') || ''
        );
        return this.httpClient.get<Teacher[]>(`${environment.baseApiURL}/teachers?_expand=course`, {
          headers: myHeaders,
        });
      }
      

    getTeacherDetail(id: string): Observable<Teacher> {
        return this.httpClient.get<Teacher>(
          `${environment.baseApiURL}/teachers/${id}?_embed=teachers`
        );
      }

      createTeacher(payload: { name: string; courseId: string }): Observable<Teacher[]> {
        return this.httpClient
          .post<Teacher>(`${environment.baseApiURL}/teachers`, payload)
          .pipe(concatMap(() => this.getTeachers()));
      }


    deleteTeacherByID(id: string): Observable <Teacher[]>{
        return this.httpClient.delete <Teacher>( `${environment.baseApiURL}/teachers/${id}` )
        .pipe(concatMap(()=>this.getTeachers()))
    }

    updateTeacherById(id: string, data: { name: string; courseId: string  }): Observable<Teacher[]> {
        return this.httpClient
          .patch<Teacher>(`${environment.baseApiURL}/teachers/${id}`, data)
          .pipe(concatMap(() => this.getTeachers()));    
      }
    







}