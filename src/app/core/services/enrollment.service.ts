import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { concatMap, Observable } from "rxjs";
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

       deleteEnrollmentByID(id: string): Observable <Enrollment[]>{
              return this.httpClient.delete <Enrollment>( `${environment.baseApiURL}/enrollments/${id}` )
              .pipe(concatMap(()=>this.getEnrollments()))
          }
      
          updateEnrollmentById(id: string, data: { name: string }): Observable<Enrollment[]> {
              return this.httpClient
                .patch<Enrollment>(`${environment.baseApiURL}/enrollments/${id}`, data)
                .pipe(concatMap(() => this.getEnrollments()));    
            }
          
      


}