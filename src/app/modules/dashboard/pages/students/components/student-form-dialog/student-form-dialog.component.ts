import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';

interface StudentFormDialogData {
  editingStudent?: Student
}

@Component({
  selector: 'app-student-form-dialog',
  standalone: false,
  templateUrl: './student-form-dialog.component.html',
  styleUrl: './student-form-dialog.component.scss'
})

export class StudentFormDialogComponent {

    StudentForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private matDialogref: MatDialogRef <StudentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: StudentFormDialogData
   
  )  {
      this.StudentForm = this.fb.group ({
        name: ['', [Validators.required]],
        lastname:['',[Validators.required]]
      });
  
      if (!!data && !!data.editingStudent) {
        this.StudentForm.patchValue(data.editingStudent)
      }
    }
   
  
  onConfirm(): void {
    if (this.StudentForm.invalid){
      this.StudentForm.markAllAsTouched();
    }
    this.matDialogref.close(this.StudentForm.value);
  }
}

