import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Teacher } from '../../models/teacher.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';

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
      'id','name', 'category','action'
    ]
  
    isAdmin$: Observable<boolean>;
  
    constructor(private authService: AuthService) {
      this.isAdmin$ = this.authService.isAdmin$;
    }
  
  }
  

