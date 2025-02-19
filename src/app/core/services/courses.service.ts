import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { generateRandomString } from "../../shared/utils";
import { Course } from "../../modules/dashboard/pages/courses/models/course.models";


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

;
    getCourses () : Observable < Course[]> {
        return of ([...DataBase ]).pipe(delay(1000));
    }

    // getCourseDetail(id: string): Observable<Course> {
    //     return this.httpClient.get<Course>(
    //       `${environment.baseApiUrl}/courses/${id}?_embed=teachers`
    //     );
    //   }
    


    deleteCourseByID(id: string): Observable< Course[]>{
        DataBase = DataBase.filter(course => course.id != id);
        return this.getCourses();
    }


}