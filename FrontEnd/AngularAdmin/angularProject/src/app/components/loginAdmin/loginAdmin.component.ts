
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-loginAdmin',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule
    ],
    templateUrl: './loginAdmin.component.html',
    styleUrl: './loginAdmin.component.css'
})
export class LoginAdminComponent {
    UserName = '';
    UserEncryptedPassword = '';
    hidePassword = true;
    isLoading = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    onLogin() {
        if (!this.UserName || !this.UserEncryptedPassword) {
            this.showSnackBar('Please fill in all fields', 'error');
            return;
        }
        this.isLoading = true;
        this.authService.login({ UserName: this.UserName, UserEncryptedPassword: this.UserEncryptedPassword })
            .subscribe({
                next: (res: any) => {
                    console.log('Logged in! Token:', res.token);
                    this.router.navigate(['/poral-manage'], { replaceUrl: true });
                    localStorage.setItem('token', res.token);
                    this.showSnackBar('Login successful!', 'success');
                    this.isLoading = false;
                },
                error: (err: any) => {
                    console.error('Login failed', err);
                    if (err.status === 401) {
                        this.showSnackBar('שם המשתמש או הסיסמה שגויים', 'error');
                    } else {
                        this.showSnackBar('אירעה שגיאה בהתחברות. אנא נסה שוב.', 'error');
                    }
                    this.isLoading = false;
                }

            });
    }

    private showSnackBar(message: string, type: 'success' | 'error') {
        this.snackBar.open(message, 'Close', {
            duration: 4000,
            panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }

    togglePasswordVisibility() {
        this.hidePassword = !this.hidePassword;
    }

    goToLoginPage() {
        window.location.href = "https://fullstackprojectfrontendreact.onrender.com";
    }

    goToRegisterPage() {
        this.router.navigate(['/poral-manage'], { replaceUrl: true });
    }
}