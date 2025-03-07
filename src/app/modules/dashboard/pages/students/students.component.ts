import { Component, OnInit } from '@angular/core';
import { Student} from './models';

import { StudentService } from '../../../../core/services/student.service';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';



@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {

  isLoading = false
  
    dataSource: Student[]=[];
  
    isAdmin$: Observable<boolean>;
  
    constructor(
      private StudentService: StudentService,
      private matDialog: MatDialog,
      private authService: AuthService
    ) {this.isAdmin$ = this.authService.isAdmin$;}
  
    
    handleStudentsUpdate(data: Student[]): void {
      this.dataSource = [...data];
    }
  
    openFromDialog(editingStudent?: Student): void {
      if (editingStudent) {
        console.log('Se va a editar: ', editingStudent);
      }
      this.matDialog
        .open(StudentFormDialogComponent, { data: { editingStudent } })
        // Cuando el dialogo se cierra...
        .afterClosed()
        .subscribe({
          next: (data) => {
            if (!!data) {
              // CREAR O ACTUALIZAR CURSO
              if (!!editingStudent) {
                // ACTUALIZAR
                this.updateStudent(editingStudent.id, data);
              } else {
                // CREAR
                this.createStudent(data);
              }
            }
          },
        });
    }
  
  
    createStudent (data: {name: string}): void{
      this.StudentService.createStudent(data).subscribe ({
        next: (data) => this.handleStudentsUpdate(data),
        error: (err) => (this.isLoading = false),
        complete: () => (this.isLoading = false),
      })
    }
  
  
  
    updateStudent(id: string, data: { name: string }) {
      this.isLoading = true;
      this.StudentService.updateStudentById(id, data).subscribe({
        next: (data) => this.handleStudentsUpdate(data),
        error: (err) => (this.isLoading = false),
        complete: () => (this.isLoading = false),
      });
    }
  
  
  
    ngOnInit (): void{
      this.isLoading = true
      this.StudentService.getStudents().subscribe({
        next:(data)=>{
          this.dataSource  = [...data];
          console.log( "recibimos los datos de GetStudents", data)
        },
        error: () =>{
          this.isLoading = false
        },
        complete:() =>
          this.isLoading = false
      })
    }
  
    onDelete(id: string): void {
      if (confirm('Esta seguro?')) {
        this.isLoading = true;
        this.StudentService.deleteStudentByID(id).subscribe({
          next: (data) => {
            this.handleStudentsUpdate(data);
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
