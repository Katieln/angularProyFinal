import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../core/services/user.service';
import { User } from './models/users.model';
import { Observable } from 'rxjs';
import { selectUsers } from './store/user.selectors';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
 isLoading = false

  dataSource: User[]=[];

  isAdmin$: Observable<boolean>;

  constructor(
    private userService: UsersService,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {this.isAdmin$ = this.authService.isAdmin$;}

  
  handleusersUpdate(data: User[]): void {
    this.dataSource = [...data];
  }

  openFromDialog(editingUser?: User): void {
    if (editingUser) {
      console.log('Se va a editar: ', editingUser);
    }
    this.matDialog
      .open(UserFormDialogComponent, { data: { editingUser } })
      // Cuando el dialogo se cierra...
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (!!data) {
            // CREAR O ACTUALIZAR CURSO
            if (!!editingUser) {
              // ACTUALIZAR
              this.updateUser(editingUser.id, data);
            } else {
              // CREAR
              this.createUser(data);
            }
          }
        },
      });
  }


  createUser (data: { name: string; email: string; password: string; role: string}): void{
    this.userService.createUser(data).subscribe ({
      next: (data) => this.handleusersUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    })
  }



  updateUser(id: string, data: { name: string }) {
    this.isLoading = true;
    this.userService.updateUserById(id, data).subscribe({
      next: (data) => this.handleusersUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }



  ngOnInit (): void{
    this.isLoading = true
    this.userService.getUsers().subscribe({
      next:(data)=>{
        this.dataSource  = [...data];
        console.log( "recibimos los datos de GetUsers", data)
      },
      error: () =>{
        this.isLoading = false
      },
      complete:() =>
        this.isLoading = false
    })
  }

  onDelete(id: string): void {
    if (confirm('Esta seguro de eliminar usuario?')) {
      this.isLoading = true;
      this.userService.deleteUserByID(id).subscribe({
        next: (data) => {
          this.handleusersUpdate(data);
        },
        error: (err) => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }


}
