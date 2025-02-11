import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { student } from './models';
import { generateRandomString } from '../../../../shared/utils';
import { StudentService } from '../../../../core/services/student.service';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {

  studentForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'lastname', 'action'];
  students: student[] = [];

  isLoading = false;
  hasError = false;

  constructor(private fb: FormBuilder,
  private studentService: StudentService
  ) {
    this.studentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],

    })
  }

  ngOnInit(): void {
    this.loadStudentsFromPromise()
    // this.loadStudentsFromObs();
  }

  loadStudentsFromPromise(): void {
    this.isLoading = true;
    this.studentService.getStudentsPromise()
    .then((student) => {
      this.students = student;
      this.isLoading = false; 
    })
    .catch((error) => {
      console.error('Error cargando estudiantes:', error);
      this.hasError = true; // Manejamos el error
    }).finally(() => {
      this.isLoading = false;
    });
  }


  // loadStudentsFromObs(): void {
  //   this.isLoading = true;
  //   this.studentsSubscription = this.studentsService
  //     .getStudentsObservable()
  //     // Entre que la info viaja del observable hacia el subcribe, podemos aplicar un pipe
  //     // para manipular la info, o el flujo de emisiones
  //     .pipe(take(3))
  //     .subscribe({
  //       next: (students) => {
  //         console.log('Recibimos datos: ', students);
  //         this.students = [...students];
  //         this.isLoading = false;
  //       },
  //       error: (error) => {
  //         alert(error);
  //         this.hasError = true;
  //         this.isLoading = false;
  //       },
  //       complete: () => {
  //         // this.isLoading = false;
  //       },
  //     });
  // }


  onSubmit() {
    if(this.studentForm.invalid){
      this.studentForm.markAllAsTouched();
    }else{
      console.log(this.studentForm.value);

      this.students = [
        ...this.students,
        {
          id: generateRandomString(8),
          ...this.studentForm.value,
        },
      ];
      this.studentForm.reset();
      
    }
  }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.students = this.students.filter((el) => el.id != id);
    }
  }

}
