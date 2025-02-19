import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../core/services/courses.service';
import { Course } from './models/course.models';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styles: ``
})
export class CoursesComponent implements OnInit{

  isLoading = false

  dataSource: Course[]=[];

  constructor(private courseService: CourseService,
    private matDialog: MatDialog,
    // private authService: AuthService
  ) {}

  
  handleCoursesUpdate(data: Course[]): void {
    this.dataSource = [...data];
  }

  // updateCourse(id: string, data: { name: string }) {
  //   this.isLoading = true;
  //   this.courseService.updateCourseById(id, data).subscribe({
  //     next: (data) => this.handleCoursesUpdate(data),
  //     error: (err) => (this.isLoading = false),
  //     complete: () => (this.isLoading = false),
  //   });
  // }


  // addCourse(data: { name: string }): void {
  //   this.isLoading = true;
  //   this.courseService.addCourse(data).subscribe({
  //     next: (data) => this.handleCoursesUpdate(data),
  //     error: (err) => (this.isLoading = false),
  //     complete: () => (this.isLoading = false),
  //   });
  // }

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
