import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Teacher } from '../../models/teacher.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TeacherFormDialogComponent } from '../teacher-form-dialog/teacher-form-dialog.component';

@Component({
  selector: 'app-teacher-table',
  standalone: false,
  templateUrl: './teacher-table.component.html',
  styleUrl: './teacher-table.component.scss'
})
export class TeacherTableComponent {

    @Input ()
    dataSource: Teacher []=[];
  
  
    @Output()
    delete = new EventEmitter<string> ()
  
    @Output()
    edit = new EventEmitter<Teacher> ()
  
  
    displayedColumns =[
      'id','name','course','action'
    ]
  
    isAdmin$: Observable<boolean>;
  
 constructor(
     private authService: AuthService,
     private dialog: MatDialog
   ) {
     this.isAdmin$ = this.authService.isAdmin$;
   }
 

 }
 

