import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EnrollmentActions } from './store/enrollment.actions';
import { combineLatest, forkJoin, map, Observable } from 'rxjs';
import { Enrollment } from './models';
import { selectEnrollments, selectEnrollmentsError, selectIsLoadingEnrollments } from './store/enrollment.selectors';
import { Course } from '../courses/models/course.models';
import { Student } from '../students/models';
import { CourseService } from '../../../../core/services/courses.service';
import { StudentService } from '../../../../core/services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enrollments',
  standalone: false,
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent implements OnInit, OnDestroy{

  enrollments$: Observable<Enrollment[]>;
  //i
  enrichedEnrollments$: Observable<Enrollment[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<unknown>;

  courses: Course[] = [];
  students: Student[] = [];

  enrollmentForm: FormGroup;

constructor(
  private store: Store,
    private courseService: CourseService,
    private studentService: StudentService,
    private fb: FormBuilder
) {
  this.enrollments$ = this.store.select(selectEnrollments);
  this.isLoading$ = this.store.select(selectIsLoadingEnrollments);
  this.error$ = this.store.select(selectEnrollmentsError);
  this.enrollmentForm = this.fb.group({
    studentId: [null, Validators.required],
    courseId: [null, Validators.required],
  });

  //i
  this.enrichedEnrollments$ = combineLatest([
    this.enrollments$,
    this.courseService.getCourses(),
    this.studentService.getStudents()
  ]).pipe(
    map(([enrollments, courses, students]) => {
      return enrollments.map(enrollment => ({
        ...enrollment,
        student: students.find(s => s.id === enrollment.studentId),
        course: courses.find(c => c.id === enrollment.courseId)
      }));
    })
  );
}




ngOnDestroy(): void {
  this.store.dispatch(EnrollmentActions.resetState());
}

ngOnInit(): void {
  this.store.dispatch(EnrollmentActions.loadEnrollments());
  this.loadStudentsAndCourses();
}

loadStudentsAndCourses(): void {
  forkJoin([
    this.courseService.getCourses(),
    this.studentService.getStudents(),
  ]).subscribe({
    next: ([courses, students]) => {
      this.courses = courses;
      this.students = students;
    },
  });
}

onSubmit(): void {
  if (this.enrollmentForm.invalid) {
    this.enrollmentForm.markAllAsTouched();
  } else {
    this.store.dispatch(
      EnrollmentActions.createEnrollment({ data: this.enrollmentForm.value })
    );
  }
}

}
