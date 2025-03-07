import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { StoreModule } from '@ngrx/store';
import { userFeature } from './store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { SharedModule } from '../../../../shared/shared.module';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';


@NgModule({
  declarations: [UsersComponent, UsersTableComponent, UserFormDialogComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([])
  ]
})
export class UsersModule { }
