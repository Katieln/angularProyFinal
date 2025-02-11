import { Injectable } from "@angular/core";
import { generateRandomString } from "../../shared/utils";
import { student } from "../../modules/dashboard/pages/students/models";

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


    //   getStudentsObservable(): Observable<student[]> {
    //     return new Observable<student[]>((subscriber) => {
    //       const students = [
    //         {
    //           id: generateRandomString(6),
    //           name: 'Jill',
    //           lastName: 'Valentine',
    //         },
    //         {
    //           id: generateRandomString(6),
    //           name: 'Chris',
    //           lastName: 'Redfield',
    //         },
    //       ];
    //       setInterval(() => {
    //         students.push({
    //           id: generateRandomString(6),
    //           name: 'NUEVO',
    //           lastName: 'ESTUDIENTE ' + students.length,
    //         });
    //         // Emitimos los estudiantes
    //         subscriber.next(students);
    //         // subscriber.error('Error al cargar estudiantes'); // Enviar un error a los subscriptores
    //         if (students.length === 10) {
    //           subscriber.complete(); // Notifica al subscritor/es que este obs ya no va a emitir mas datos
    //         }
    //       }, 1000);
    //     });
    //   }




}