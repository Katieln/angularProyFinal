import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { EnrollmentService } from '../../../../../core/services/enrollment.service';


@Injectable()
export class EnrollmentEffects {
  private actions$ = inject(Actions);

  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.loadEnrollments),
      concatMap(() =>
        this.enrollmentService.getEnrollments().pipe(
        // Si el servicio responde OK
        map((enrollments) =>
          EnrollmentActions.loadEnrollmentsSuccess({ data: enrollments })
        ),
        // Si el servicio desponde ERROR
        catchError((error) =>
          of(EnrollmentActions.loadEnrollmentsFailure({ error }))
        )
      )
    )
  );
});

createEnrollments$ = createEffect(() => {
  return this.actions$.pipe(
    // Quiero escuchar solamente las acciones de tipo:
    ofType(EnrollmentActions.createEnrollment),
    // Y luego quiero ir a buscar las enrollments a mi base de datos
    concatMap((action) =>
      this.enrollmentService.createEnrollment(action.data).pipe(
        // Si el servicio responde OK
        map((enrollment) =>
          EnrollmentActions.createEnrollmentSuccess({ data: enrollment })
        ),
        // Si el servicio desponde ERROR
        catchError((error) =>
          of(EnrollmentActions.createEnrollmentFailure({ error }))
        )
      )
    )
  );
});


deleteEnrollment$ = createEffect(() =>
  this.actions$.pipe(
    ofType(EnrollmentActions.deleteEnrollment),
    concatMap((action) =>
      this.enrollmentService.deleteEnrollmentByID(action.id).pipe(
        map(() => EnrollmentActions.deleteEnrollmentSuccess({ id: action.id })),
        catchError((error) => of(EnrollmentActions.deleteEnrollmentFailure({ error })))
      )
    )
  )
);

// updateEnrollment$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(EnrollmentActions.updateEnrollment),
//     concatMap((action) =>
//       this.enrollmentService.updateEnrollmentById(action.id, action.data).pipe(
//         map((updatedEnrollment) =>
//           EnrollmentActions.updateEnrollmentSuccess({ data: updatedEnrollment })
//         ),
//         catchError((error) => of(EnrollmentActions.updateEnrollmentFailure({ error })))
//       )
//     )
//   )
// );


  constructor(
    private enrollmentService: EnrollmentService) {}
}
