import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../modules/dashboard/pages/users/models/users.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Load Auths': emptyProps(),
    
    // Establecer usuario authenticado
    'set auth user': props<{ user: User }>(),
    // Desestablecer usuario authenticado
    'unset auth user': emptyProps(), // Esta accion no recibe datos
    
  }
});
