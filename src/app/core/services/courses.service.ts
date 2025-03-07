import { Injectable } from "@angular/core";
import { concatMap, delay, Observable, of } from "rxjs";
import { generateRandomString } from "../../shared/utils";
import { Course } from "../../modules/dashboard/pages/courses/models/course.models";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";



@Injectable ({ providedIn: 'root' })

export class CourseService {


    constructor(private httpClient: HttpClient){}

    getCourses(): Observable<Course[]> {

      const myHeaders = new HttpHeaders().append(
        'Authorization',
        localStorage.getItem('access_token') || ''
      );
      return this.httpClient.get<Course[]>(`${environment.baseApiURL}/courses`, {
        headers: myHeaders,
      });
    }


    getCourseDetail(id: string): Observable<Course> {
        return this.httpClient.get<Course>(
          `${environment.baseApiURL}/courses/${id}?_embed=teachers`
        );
      }


    createCourse ( payload : {name: string}): Observable <Course[]> {
        return this.httpClient.post <Course>( `${environment.baseApiURL}/courses`,  payload )
        .pipe(concatMap(()=>this.getCourses()))


    }

    deleteCourseByID(id: string): Observable <Course[]>{
        return this.httpClient.delete <Course>( `${environment.baseApiURL}/courses/${id}` )
        .pipe(concatMap(()=>this.getCourses()))
    }

    updateCourseById(id: string, data: { name: string }): Observable<Course[]> {
        return this.httpClient
          .patch<Course>(`${environment.baseApiURL}/courses/${id}`, data)
          .pipe(concatMap(() => this.getCourses()));    
      }
    







}