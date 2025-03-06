import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Enrollment } from '../models';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollment',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: Enrollment[] }>(),
    'Load Enrollments Failure': props<{ error: unknown }>(),
    'Reset State':emptyProps(),


    'Create Enrollment': props<{ data: Omit<Enrollment, 'id'> }>(),
    'Create Enrollment Success': props<{ data: Enrollment }>(),
    'Create Enrollment Failure': props<{ error: unknown }>(),


  }
});
