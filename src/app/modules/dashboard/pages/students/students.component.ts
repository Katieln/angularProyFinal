import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { student } from './models';
import { generateRandomString } from '../../../../shared/utils';
import { StudentService } from '../../../../core/services/student.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';



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

  studentsSubscription?: Subscription;

  editingStudentId: string | null = null;

  constructor(private fb: FormBuilder,
    private matDialog: MatDialog,
    private studentService: StudentService
  ) {
    this.studentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],

    })
  }

  ngOnDestroy(): void {
    // Este ciclo de vida se llama cuando el componente se destruye (sale de la vista);
    this.studentsSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    // this.loadStudentsFromPromise()
    this.loadStudentsFromObsv();
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
  //   this.studentService.getStudentsObservable().subscribe({
  //       next: (students) => {
  //         console.log('Recibimos datos: ', students);
  //         this.students = students;
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

  loadStudentsFromObsv(): void {
    this.isLoading = true;
    this.studentsSubscription = this.studentService
      .getStudentsObservable()
      .subscribe({
        next: (students) => {
          console.log('Recibimos datos: ', students);
          this.students = [...students];
          this.isLoading = false;
        },
        error: (error) => {
          alert(error);
          this.hasError = true;
          this.isLoading = false;
        },
        complete: () => {
          // this.isLoading = false;
        },
      });
  }


  onSubmit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      console.log(this.studentForm.value);

      if (!!this.editingStudentId) {
        // editar

        this.students = this.students.map((student) => 
          student.id === this.editingStudentId 
        ? { ...student, ...this.studentForm.value }
          : student);
          this.editingStudentId =null;
      } else {
        // crear 
        this.students = [
          ...this.students,
          {
            id: generateRandomString(8),
            ...this.studentForm.value,
          },
        ];
      }
      this.studentForm.reset();

    }
  }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.students = this.students.filter((el) => el.id != id);
    }
  }

  onEdit(student: student): void {
    this.editingStudentId = student.id; // 💡 Asigna el ID para saber qué estudiante se está editando
    
    this.studentForm.patchValue({
      name: student.name,
      lastName: student.lastname
    });
  }

}
