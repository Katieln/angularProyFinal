import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Enrollment } from "../../modules/dashboard/pages/enrollments/models";
import { environment } from "../../../environments/environment.development";


@Injectable({providedIn: 'root'})
export class EnrollmentService {
    constructor(private httpClient: HttpClient) {}


    getEnrollments(): Observable<Enrollment[]>{
        return this.httpClient.get<Enrollment[]>(`${environment.baseApiURL}/enrollments`);
    }


    createEnrollment(data: Omit<Enrollment, 'id'>): Observable<Enrollment> {
        return this.httpClient.post<Enrollment>(
          `${environment.baseApiURL}/enrollments`,
          data
        );
      }


}