import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { FullNamePipe } from './pipes/full-name.pipe';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    FullNamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatListModule,
    FullNamePipe,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule
  ]
})
export class SharedModule { }
