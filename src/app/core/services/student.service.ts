import { Injectable } from "@angular/core";
import { generateRandomString } from "../../shared/utils";
import { student } from "../../modules/dashboard/pages/students/models";
import { Observable } from "rxjs";


@Injectable({providedIn:'root'})

export class StudentService {

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
            
            subscriber.error('Error al cargar estudiantes'); // Enviar un error a los subscriptores
            
            subscriber.complete(); // Notifica al suscriptor que este Observable ya no emitirá más datos
          }, 1000);
        });
      }
    }



