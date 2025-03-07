import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../core/services/courses.service';
import { Course } from './models/course.models';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styles: ``
})
export class CoursesComponent implements OnInit{

  isLoading = false

  dataSource: Course[]=[];

  isAdmin$: Observable<boolean>;

  constructor(
    private courseService: CourseService,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {this.isAdmin$ = this.authService.isAdmin$;}

  
  handleCoursesUpdate(data: Course[]): void {
    this.dataSource = [...data];
  }

  openFromDialog(editingCourse?: Course): void {
    if (editingCourse) {
      console.log('Se va a editar: ', editingCourse);
    }
    this.matDialog
      .open(CourseFormDialogComponent, { data: { editingCourse } })
      // Cuando el dialogo se cierra...
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (!!data) {
            // CREAR O ACTUALIZAR CURSO
            if (!!editingCourse) {
              // ACTUALIZAR
              this.updateCourse(editingCourse.id, data);
            } else {
              // CREAR
              this.createCourse(data);
            }
          }
        },
      });
  }


  createCourse (data: {name: string}): void{
    this.courseService.createCourse(data).subscribe ({
      next: (data) => this.handleCoursesUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    })
  }



  updateCourse(id: string, data: { name: string }) {
    this.isLoading = true;
    this.courseService.updateCourseById(id, data).subscribe({
      next: (data) => this.handleCoursesUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }



  ngOnInit (): void{
    this.isLoading = true
    this.courseService.getCourses().subscribe({
      next:(data)=>{
        this.dataSource  = [...data];
        console.log( "recibimos los datos de GetCourses", data)
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
      this.courseService.deleteCourseByID(id).subscribe({
        next: (data) => {
          this.handleCoursesUpdate(data);
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
