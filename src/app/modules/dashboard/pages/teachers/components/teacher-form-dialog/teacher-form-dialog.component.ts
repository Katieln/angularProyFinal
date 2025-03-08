import { Component, Inject } from '@angular/core';
import { Teacher } from '../../models/teacher.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../../courses/models/course.models';
import { CourseService } from '../../../../../../core/services/courses.service';

interface TeacherFormDialogData {
  editingTeacher?: Teacher
}


@Component({
  selector: 'app-teacher-form-dialog',
  standalone: false,
  templateUrl: './teacher-form-dialog.component.html',
  styleUrl: './teacher-form-dialog.component.scss'
})
export class TeacherFormDialogComponent {
  TeacherForm: FormGroup;
  courses: Course[] = [];
  
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private matDialogref: MatDialogRef <TeacherFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: TeacherFormDialogData
   
  )  {
      this.TeacherForm = this.fb.group ({
        name: ['', [Validators.required]],
        courseId:['',[Validators.required]]
      });
  
      if (!!data && !!data.editingTeacher) {
        this.TeacherForm.patchValue(data.editingTeacher)
      }    
    }
   
  
    onConfirm(): void {
      console.log('Botón Confirmar presionado');
      if (this.TeacherForm.invalid) {
        this.TeacherForm.markAllAsTouched();
        return;
      }
      const teacherData = {
        name: this.TeacherForm.value.name,
        courseId: this.TeacherForm.value.courseId // course ya tiene el ID
      };
      console.log("Datos del profesor a guardar:", teacherData); // Verifica que el objeto tenga `courseId`
    
      this.matDialogref.close(teacherData);
    }
    


  ngOnInit(): void {
    this.loadCourses();
  }
  private loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        console.log("Cursos cargados en el formulario:", this.courses);
      },
      error: (err) => console.error("Error cargando cursos en el formulario", err)
    });
  }
  

}

