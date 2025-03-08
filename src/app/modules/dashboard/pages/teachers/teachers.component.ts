import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TeacherService } from '../../../../core/services/teacher.service';
import { Teacher } from './models/teacher.model';
import { TeacherFormDialogComponent } from './components/teacher-form-dialog/teacher-form-dialog.component';
import { Course } from '../courses/models/course.models';
import { CourseService } from '../../../../core/services/courses.service';

@Component({
  selector: 'app-teachers',
  standalone: false,
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent  implements OnInit{

  isLoading = false 

  dataSource: Teacher[]=[];
  courses: Course[] = [];

  isAdmin$: Observable<boolean>;

  constructor(
    private TeacherService: TeacherService,
    private courseService: CourseService,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {
    this.isAdmin$ = this.authService.isAdmin$;
    this.courseService.getCourses()}

  
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


  createTeacher(data: { name: string; courseId: string }): void {
    this.TeacherService.createTeacher(data).subscribe({
      next: (updatedTeachers) => this.handleTeachersUpdate(updatedTeachers),
      error: (err) => console.error("Error al crear profesor:", err),
      complete: () => (this.isLoading = false),
    });
  }
  
  
  updateTeacher(id: string, data: { name: string; courseId: string }): void {
    this.isLoading = true;
    this.TeacherService.updateTeacherById(id, data).subscribe({
      next: (updatedTeachers) => this.handleTeachersUpdate(updatedTeachers),
      error: (err) => console.error("Error al actualizar profesor:", err),
      complete: () => (this.isLoading = false),
    });
  }


  ngOnInit(): void {
    this.isLoading = true;
  
    // Cargar cursos primero
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        console.log("Cursos cargados:", this.courses);
  
        // Ahora cargar los profesores y asignar el curso correspondiente
        this.TeacherService.getTeachers().subscribe({
          next: (teachers) => {
            this.dataSource = teachers.map(teacher => ({
              ...teacher,
              course: this.courses.find(course => course.id === teacher.courseId)
            }));
            console.log("Profesores cargados con cursos asignados:", this.dataSource);
          },
          error: () => this.isLoading = false,
          complete: () => this.isLoading = false
        });
      },
      error: (err) => console.error("Error cargando cursos", err)
    });
  }
  


  onDelete(id: string): void {
    if (confirm('Esta seguro de eliminar profesor?')) {
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

