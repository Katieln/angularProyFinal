import { Component, Inject } from '@angular/core';
import { User } from '../../models/users.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface UserFormDialogData {
  editingUser?: User
}

@Component({
  selector: 'app-user-form-dialog',
  standalone: false,
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.scss'
})

export class UserFormDialogComponent {

  UserForm: FormGroup;

constructor(
  private fb: FormBuilder,
  private matDialogref: MatDialogRef <UserFormDialogComponent>,
  @Inject(MAT_DIALOG_DATA) private data?: UserFormDialogData

)  {
    this.UserForm = this.fb.group ({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });

    if (!!data && !!data.editingUser) {
      this.UserForm.patchValue(data.editingUser)
    }
  }


onConfirm(): void {

  if (this.UserForm.invalid){
    this.UserForm.markAllAsTouched();
    return;
  }
  this.matDialogref.close(this.UserForm.value);
}
}
