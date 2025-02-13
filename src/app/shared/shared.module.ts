import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { FullNamePipe } from './pipes/full-name.pipe';



@NgModule({
  declarations: [
    FullNamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatListModule,
    FullNamePipe
  ]
})
export class SharedModule { }
