import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormDialogComponent } from '../student-form-dialog/student-form-dialog.component';

@Component({
  selector: 'app-student-table',
  standalone: false,
  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.scss'
})
export class StudentTableComponent {
 @Input ()
  dataSource: Student []=[];


  @Output()
  delete = new EventEmitter<string> ()

  @Output()
  edit = new EventEmitter<Student> ()


  displayedColumns =[
    'id','name','lastname', 'action'
  ]

  isAdmin$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.isAdmin$ = this.authService.isAdmin$;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(StudentFormDialogComponent, {
      width: '400px', // Tamaño del modal
      data: { message: "Hola, este es un formulario" } // Puedes enviar datos opcionales
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró', result);
    });
  }
}
