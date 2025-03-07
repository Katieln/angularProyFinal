import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Enrollment } from '../../models';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
  selector: 'app-enrollment-table',
  standalone: false,
  templateUrl: './enrollment-table.component.html',
  styleUrl: './enrollment-table.component.scss'
})
export class EnrollmentTableComponent {
 @Input ()
  dataSource: Enrollment []=[];


    @Output()
    delete = new EventEmitter<string> ()
  
    @Output()
    edit = new EventEmitter<Enrollment> ()

  displayedColumns =[
    'id','student', 'course', 'action'
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'] && changes['dataSource'].currentValue) {
      this.dataSource = changes['dataSource'].currentValue;
    }

  }

  isAdmin$: Observable<boolean>;
  
    constructor(private authService: AuthService) {
      this.isAdmin$ = this.authService.isAdmin$;
    }
  

}
