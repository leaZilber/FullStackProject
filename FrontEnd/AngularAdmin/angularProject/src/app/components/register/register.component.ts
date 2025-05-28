// import { Component } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

// // Angular Material Imports
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
// import { MatSelectModule } from '@angular/material/select';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';

// @Component({
//   selector: 'app-register',
//   imports: [
//     CommonModule, 
//     FormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,  
//     MatCardModule,
//     MatIconModule,
//     MatSnackBarModule,
//     MatSelectModule,
//     MatDatepickerModule,
//     MatNativeDateModule
//   ], 
//   standalone: true,
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   registerData = {
//     userName: '',
//     userEmail: '',
//     userEncryptedPassword: '',
//     userRole: 'Admin',
//     userPhone: '',
//     userAddress: '',
//     userBirth: ''
//   };

//   hidePassword = true;
//   successMessage = '';
//   errorMessage = '';

//   constructor(
//     private authService: AuthService,
//     private router: Router,
//     private snackBar: MatSnackBar
//   ) {}

//   onRegister() {
//     this.authService.register(this.registerData)
//       .subscribe({
//         next: (res) => {
//           this.successMessage = 'Registration successful!';
//           this.errorMessage = '';
          
//           // Show success snackbar
//           this.snackBar.open('Registration successful!', 'Close', {
//             duration: 3000,
//             panelClass: ['success-snackbar']
//           });
          
//           setTimeout(() => {
//             this.router.navigate(['/login']);
//           }, 1500);
//         },
//         error: (err) => {
//           this.successMessage = '';
//           this.errorMessage = 'Registration failed. ' + (err?.error || '');
          
//           // Show error snackbar
//           this.snackBar.open('Registration failed: ' + (err?.error || 'Unknown error'), 'Close', {
//             duration: 5000,
//             panelClass: ['error-snackbar']
//           });
//         }
//       });
//   }

//   togglePasswordVisibility() {
//     this.hidePassword = !this.hidePassword;
//   }
// }










import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Angular Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,  
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ], 
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 
  registerData = {
    UserName: '',
    UserEmail: '',
    UserEncryptedPassword: '',
    UserRole: 'Admin',
    UserPhone: '',
    UserAddress: '',
    UserBirth: '',
    UserCreateDate:new Date()
  };
 
  hidePassword = true;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
 
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
 
  onRegister() {
    this.isLoading = true;
    
    this.authService.register(this.registerData)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.successMessage = 'Registration successful!';
          this.errorMessage = '';
                   
          // Show success snackbar
          this.snackBar.open('Registration successful!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
                   
          setTimeout(() => {
            this.router.navigate(['/loginAdmin']);
          }, 1500);
        },
        error: (err) => {
          this.isLoading = false;
          this.successMessage = '';
          this.errorMessage = 'Registration failed. ' + (err?.error || '');
                   
          // Show error snackbar
          this.snackBar.open('Registration failed: ' + (err?.error || 'Unknown error'), 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
  }
 
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}