import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { student } from './models';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  studentForm: FormGroup;

  students: student[] = [];


  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],

    })
  }


  onSubmit() {
    if(this.studentForm.invalid){
      this.studentForm.markAllAsTouched();
    }else{
      console.log(this.studentForm.value);
      this.students.push({
        ...this.studentForm.value
      })
    }
  }


}
