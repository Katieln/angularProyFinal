import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TeacherService } from '../../../../core/services/teacher.service';
import { Teacher } from './models/teacher.model';
import { TeacherFormDialogComponent } from './components/teacher-form-dialog/teacher-form-dialog.component';

@Component({
  selector: 'app-teachers',
  standalone: false,
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent  implements OnInit{

  isLoading = false

  dataSource: Teacher[]=[];

  isAdmin$: Observable<boolean>;

  constructor(
    private TeacherService: TeacherService,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {this.isAdmin$ = this.authService.isAdmin$;}

  
  handleTeachersUpdate(data: Teacher[]): void {
    this.dataSource = [...data];
  }

  openFromDialog(editingTeacher?: Teacher): void {
    if (editingTeacher) {
      console.log('Se va a editar: ', editingTeacher);
    }
    this.matDialog
      .open(TeacherFormDialogComponent, { data: { editingTeacher } })
      // Cuando el dialogo se cierra...
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (!!data) {
            // CREAR O ACTUALIZAR CURSO
            if (!!editingTeacher) {
              // ACTUALIZAR
              this.updateTeacher(editingTeacher.id, data);
            } else {
              // CREAR
              this.createTeacher(data);
            }
          }
        },
      });
  }


  createTeacher (data: {name: string}): void{
    this.TeacherService.createTeacher(data).subscribe ({
      next: (data) => this.handleTeachersUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    })
  }



  updateTeacher(id: string, data: { name: string }) {
    this.isLoading = true;
    this.TeacherService.updateTeacherById(id, data).subscribe({
      next: (data) => this.handleTeachersUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }



  ngOnInit (): void{
    this.isLoading = true
    this.TeacherService.getTeachers().subscribe({
      next:(data)=>{
        this.dataSource  = [...data];
        console.log( "recibimos los datos de GetTeachers", data)
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
      this.TeacherService.deleteTeacherByID(id).subscribe({
        next: (data) => {
          this.handleTeachersUpdate(data);
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

