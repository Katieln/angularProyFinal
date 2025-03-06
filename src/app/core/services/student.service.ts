import { Injectable } from "@angular/core";
import { generateRandomString } from "../../shared/utils";
import { student } from "../../modules/dashboard/pages/students/models";
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment.development";


@Injectable({providedIn:'root'})

export class StudentService {

  constructor(private httpClient: HttpClient){}

      getStudents(): Observable<student[]> {
        // return of([...MY_FAKE_DATABASE]).pipe(delay(300));
        const myHeaders = new HttpHeaders().append(
          'Authorization',
          localStorage.getItem('access_token') || ''
        );
        return this.httpClient.get<student[]>(`${environment.baseApiURL}/students`, {
          headers: myHeaders,
        });
      }

    getStudentsPromise(): Promise<student[]> {
        return new Promise<student[]>((resolve, reject) => {
          // reject('Error de conexion');
          setTimeout(() => {
            resolve([
              {
                id: generateRandomString(6),
                name: 'Luna',
                lastname: 'Love',
              },
              {
                id: generateRandomString(6),
                name: 'Chris',
                lastname: 'Red',
              },
            ]);
          }, 3000);
        });
      }



      getStudentsObservable(): Observable<student[]> { 
        return new Observable<student[]>((subscriber) => {
          const students = [
            {
              id: generateRandomString(6),
              name: 'Luna',
              lastname: 'Love',
            },
            {
              id: generateRandomString(6),
              name: 'Chris',
              lastname: 'Red',
            },
          ];
      
          setTimeout(() => {
            // Emitimos los estudiantes
            subscriber.next(students);
            
            // subscriber.error('Error al cargar estudiantes'); // Enviar un error a los subscriptores
            
            subscriber.complete(); // Notifica al suscriptor que este Observable ya no emitirá más datos
          }, 1000);
        });
      }
    }



