import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models/course.models';

interface CourseFormDialogData {
  editingCourse?: Course
}


@Component({
  selector: 'app-course-form-dialog',
  standalone: false,
  templateUrl: './course-form-dialog.component.html',
  styleUrl: './course-form-dialog.component.scss'
})

export class CourseFormDialogComponent {

  courseForm: FormGroup;

constructor(
  private fb: FormBuilder,
  private matDialogref: MatDialogRef <CourseFormDialogComponent>,
  @Inject(MAT_DIALOG_DATA) private data?: CourseFormDialogData

)  {
    this.courseForm = this.fb.group ({
      name: ['', [Validators.required]],
      category:['']
    });

    if (!!data && !!data.editingCourse) {
      this.courseForm.patchValue(data.editingCourse)
    }
  }


onConfirm(): void {

  if (this.courseForm.invalid){
    this.courseForm.markAllAsTouched();
  }
  this.matDialogref.close(this.courseForm.value);
}
}
