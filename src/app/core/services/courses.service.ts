import { Injectable } from "@angular/core";
import { concatMap, delay, Observable, of } from "rxjs";
import { generateRandomString } from "../../shared/utils";
import { Course } from "../../modules/dashboard/pages/courses/models/course.models";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";


let DataBase: Course [] = [
    {
        id: generateRandomString(6),
        name: "JavaScript"
    },
    {
        id: generateRandomString(6),
        name: "Angular"
    },
    {
        id: generateRandomString(6),
        name: "Java"
    }
];

@Injectable ({ providedIn: 'root' })

export class CourseService {


    constructor(private httpClient: HttpClient){}

  getCourses () : Observable < Course[]> {
        // return of ([...DataBase ]).pipe(delay(1000));
        return this.httpClient.get<Course[]>( `${environment.baseApiURL}/courses`)
    }

    getCourseDetail(id: string): Observable<Course> {
        return this.httpClient.get<Course>(
          `${environment.baseApiURL}/courses/${id}?_embed=teachers`
        );
      }


    createCourse ( payload : {name: string}): Observable <Course[]> {
        return this.httpClient.post <Course>( `${environment.baseApiURL}/courses`,  payload )
        .pipe(concatMap(()=>this.getCourses()))

        // DataBase.push(
        //     {...payload,
        //     id: generateRandomString(6),
        // })
        // return this.getCourses();
    }

    deleteCourseByID(id: string): Observable <Course[]>{
        return this.httpClient.delete <Course>( `${environment.baseApiURL}/courses/${id}` )
        .pipe(concatMap(()=>this.getCourses()))


        // DataBase = DataBase.filter(course => course.id != id);
        // return this.getCourses();
    }

    updateCourseById(id: string, data: { name: string }): Observable<Course[]> {
        return this.httpClient
          .patch<Course>(`${environment.baseApiURL}/courses/${id}`, data)
          .pipe(concatMap(() => this.getCourses()));

        // DataBase = DataBase.map((course) =>
        //     course.id === id ? { ...course, ...data } : course
        //   );
        //   return this.getCourses();
      
      }
    







}