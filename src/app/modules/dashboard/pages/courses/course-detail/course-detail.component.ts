import { Component } from '@angular/core';
import { CourseService } from '../../../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../models/course.models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-detail',
  standalone: false,
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {

  isLoading = false;
  course : Course | null = null;

  errorMessage = '';

  constructor(private courseService: CourseService,
    private activatedRoute: ActivatedRoute
  ){}


  ngOnInit(): void {
    this.isLoading = true;
    this.courseService.getCourseDetail(this.activatedRoute.snapshot.params['id']).subscribe(
      {next: (course => {
        this.course = course
      }),
      error:(error)=> {this.isLoading = false;
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            this.errorMessage = 'El curso no existe';
          }
        }
      }
      ,
      complete: () => this.isLoading = false,}
    )
  }

}
