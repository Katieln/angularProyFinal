import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { StoreModule } from '@ngrx/store';
import { enrollmentFeature } from './store/enrollment.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EnrollmentEffects } from './store/enrollment.effects';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    StoreModule.forFeature(enrollmentFeature),
    EffectsModule.forFeature([EnrollmentEffects]),
    SharedModule
  ]
})
export class EnrollmentsModule { }
