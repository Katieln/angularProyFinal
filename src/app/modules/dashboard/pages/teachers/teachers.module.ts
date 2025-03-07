import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { TeacherTableComponent } from './components/teacher-table/teacher-table.component';
import { SharedModule } from '../../../../shared/shared.module';
import { TeacherFormDialogComponent } from './components/teacher-form-dialog/teacher-form-dialog.component';


@NgModule({
  declarations: [
    TeachersComponent,
    TeacherTableComponent,
    TeacherFormDialogComponent
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    SharedModule
  ]
})
export class TeachersModule { }
