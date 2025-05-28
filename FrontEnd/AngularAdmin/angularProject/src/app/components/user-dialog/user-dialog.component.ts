// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { User } from '../../models/user.model';

// interface DialogData {
//   isEdit: boolean;
//   user?: User;
// }

// @Component({
//   selector: 'app-user-dialog',
//   templateUrl: './user-dialog.component.html',
//   styleUrls: ['./user-dialog.component.scss']
// })
// export class UserDialogComponent implements OnInit {
//   userForm!: FormGroup;
//   isEdit: boolean;
//   hidePassword = true;

//   userRoles = [
//     { value: 'user', label: 'משתמש רגיל' },
//     { value: 'admin', label: 'מנהל מערכת' }
//   ];

//   constructor(
//     private fb: FormBuilder,
//     private dialogRef: MatDialogRef<UserDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData
//   ) {
//     this.isEdit = data.isEdit;
//   }

//   ngOnInit(): void {
//     this.initializeForm();
    
//     if (this.isEdit && this.data.user) {
//       this.populateForm(this.data.user);
//     }
//   }

//   private initializeForm(): void {
//     this.userForm = this.fb.group({
//       id: [null],
//       userName: ['', [Validators.required, Validators.minLength(2)]],
//       userEmail: ['', [Validators.required, Validators.email]],
//       userEncryptedPassword: ['', this.isEdit ? [] : [Validators.required, Validators.minLength(6)]],
//       userPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
//       userAddress: ['', [Validators.required]],
//       userBirth: ['', [Validators.required]],
//       userRole: ['user', [Validators.required]],
//       userCreateDate: [new Date()]
//     });
//   }

//   private populateForm(user: User): void {
//     this.userForm.patchValue({
//       id: user.id,
//       userName: user.userName,
//       userEmail: user.userEmail,
//       userPhone: user.userPhone,
//       userAddress: user.userAddress,
//       userBirth: user.userBirth ? new Date(user.userBirth) : null,
//       userRole: user.userRole,
//       userCreateDate: user.userCreateDate
//     });

//     // Remove password requirement for edit mode
//     this.userForm.get('userEncryptedPassword')?.clearValidators();
//     this.userForm.get('userEncryptedPassword')?.updateValueAndValidity();
//   }

//   onSubmit(): void {
//     if (this.userForm.valid) {
//       const formValue = this.userForm.value;
      
//       // Format birth date
//       if (formValue.userBirth) {
//         formValue.userBirth = new Date(formValue.userBirth).toISOString();
//       }

//       // Don't send empty password in edit mode
//       if (this.isEdit && !formValue.userEncryptedPassword) {
//         delete formValue.userEncryptedPassword;
//       }

//       this.dialogRef.close(formValue);
//     } else {
//       this.markFormGroupTouched();
//     }
//   }

//   onCancel(): void {
//     this.dialogRef.close();
//   }

//   getErrorMessage(controlName: string): string {
//     const control = this.userForm.get(controlName);
    
//     if (control?.hasError('required')) {
//       return 'שדה זה הוא חובה';
//     }
    
//     if (control?.hasError('email')) {
//       return 'כתובת אימייל לא תקינה';
//     }
    
//     if (control?.hasError('minlength')) {
//       const requiredLength = control.getError('minlength').requiredLength;
//       return `חייב להכיל לפחות ${requiredLength} תווים`;
//     }
    
//     if (control?.hasError('pattern')) {
//       if (controlName === 'userPhone') {
//         return 'מספר טלפון לא תקין';
//       }
//     }
    
//     return '';
//   }

//   private markFormGroupTouched(): void {
//     Object.keys(this.userForm.controls).forEach(key => {
//       const control = this.userForm.get(key);
//       control?.markAsTouched();
//     });
//   }

//   togglePasswordVisibility(): void {
//     this.hidePassword = !this.hidePassword;
//   }