import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';
import { User } from '../../models/users.model';

@Component({
  selector: 'app-users-table',
  standalone: false,
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  @Input ()
  dataSource: User []=[];


  @Output()
  delete = new EventEmitter<string> ()

  @Output()
  edit = new EventEmitter<User> ()


  displayedColumns =[
    'id','name', 'role','action'
  ]

  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.isAdmin$;
  }
}
