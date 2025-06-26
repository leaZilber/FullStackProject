import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterPostModel } from '../../models/registerDTO';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core'; // ← הוסף את זה

export interface UserResponseModel {
  UserId: number;
  UserName: string;
  UserEmail: string;
  UserRole: string;
  UserPhone?: string;
  UserAddress?: string;
  UserBirth?: Date;
  UserCreateDate?: Date;
}

export interface UserModel {
  UserId?: number;
  UserName: string;
  UserEmail: string;
  UserEncryptedPassword?: string;
  UserPhone?: string;
  UserAddress?: string;
  UserBirth?: Date;
  UserRole: string;
  UserCreateDate?: Date;
}

export interface UserPostModel {
  UserName: string;
  UserEmail: string;
  UserEncryptedPassword: string;
  UserPhone?: string;
  UserAddress?: string;
  UserBirth?: Date;
  UserRole?: string;
}

export interface UserUpdateModel {
  // UserId: number;
  UserName?: string;
  UserEmail?: string;
  UserEncryptedPassword?: string;
  UserPhone?: string;
  UserAddress?: string;
  UserBirth?: Date;
  UserRole?: string;
}

@Component({
  selector: 'app-user-management',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ReactiveFormsModule,
    MatChipsModule
  ],
  standalone: true,
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, AfterViewInit {

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initializeForm();
  }

  displayedColumns: string[] = ['UserId', 'UserName', 'UserEmail', 'UserPhone', 'UserRole', 'UserCreateDate', 'actions'];
  dataSource = new MatTableDataSource<UserModel>();
  isLoading = false;
  totalUsers = 0;
  showUserForm = false;
  isEditMode = false;
  userForm!: FormGroup;
  hidePassword = true;
  currentUserId?: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      UserName: ['', [Validators.required]],
      UserEmail: ['', [Validators.required, Validators.email]],
      UserEncryptedPassword: ['', [Validators.required, Validators.minLength(6)]],
      UserPhone: [''],
      UserAddress: [''],
      UserBirth: [null],
      UserRole: ['user', [Validators.required]]
    });
  }

  private mapRegisterToUser(registerData: RegisterPostModel[]): UserModel[] {
    return registerData.map(item => ({
      UserId: item.userId, 
      UserName: item.userName || '',
      UserEmail: item.userEmail || '',
      UserRole: item.userRole || 'user',
      UserPhone: item.userPhone,
      UserAddress: item.userAddress,
      UserBirth: item.userBirth,
      UserCreateDate: item.userCreateDate
    }));
  }

  loadUsers(): void {
    this.isLoading = true;
    console.log('Starting to load users...');
    
    this.userService.getAllUsers().subscribe({
      next: (registerData: RegisterPostModel[]) => {
        console.log('Raw data received from server:', registerData);
        console.log('Data type:', typeof registerData);
        console.log('Is array:', Array.isArray(registerData));
        
        if (!registerData || !Array.isArray(registerData)) {
          console.error('Invalid data format received:', registerData);
          this.showSnackBar('פורמט הנתונים לא תקין', 'error');
          this.isLoading = false;
          return;
        }
        
        console.log('Number of users received:', registerData.length);
        
        if (registerData.length === 0) {
          console.log('No users found in database');
          this.showSnackBar('לא נמצאו משתמשים במערכת', 'info'); 
        }
        
        const users = this.mapRegisterToUser(registerData);
        console.log('Mapped users:', users);
        
        const usersWithoutId = users.filter(user => !user.UserId);
        if (usersWithoutId.length > 0) {
          console.warn('Found users without ID:', usersWithoutId);
        }
        
        this.dataSource.data = users;
        this.totalUsers = users.length;
        this.isLoading = false;
        
        console.log('Users loaded successfully. Total:', this.totalUsers);
      },
      error: (error) => {
        console.error('=== ERROR DETAILS ===');
        console.error('Full error object:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error URL:', error.url);
        console.error('Error name:', error.name);
        
        if (error.status === 404) {
          console.error('404 Error - API endpoint not found');
          this.showSnackBar('נתיב ה-API לא נמצא - בדוק את כתובת השרת', 'error');
        } 
        else if (error.status === 0) {
          console.error('Network Error - Server might be down');
          this.showSnackBar('שגיאת רשת - השרת אינו זמין', 'error');
        } 
        else if (error.status === 500) {
          console.error('Server Error');
          this.showSnackBar('שגיאת שרת פנימית', 'error');
        } 
        else {
          this.showSnackBar(`שגיאה בטעינת המשתמשים: ${error.status}`, 'error');
        }
        
        this.isLoading = false;
      }
    });
  }
  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showAddUserForm(): void {
    this.isEditMode = false;
    this.showUserForm = true;
    this.currentUserId = undefined;
    this.initializeForm();
  }


  editUser(user: UserModel): void {
    console.log('Editing user:', user); 
    
    if (!user.UserId) {
      console.error('Cannot edit user without ID:', user);
      this.showSnackBar('לא ניתן לערוך משתמש ללא מזהה', 'error');
      return;
    }
  
    this.isEditMode = true;
    this.showUserForm = true;
    this.currentUserId = user.UserId;
  
    this.userForm.patchValue({
      UserName: user.UserName,
      UserEmail: user.UserEmail,
      UserPhone: user.UserPhone,
      UserAddress: user.UserAddress,
      UserBirth: user.UserBirth,
      UserRole: user.UserRole
    });
  
    this.userForm.get('UserEncryptedPassword')?.clearValidators();
    this.userForm.get('UserEncryptedPassword')?.updateValueAndValidity();
  }

  saveUser(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      const formValue = this.userForm.value;
  
      if (this.isEditMode && this.currentUserId) {
        // const updateData: UserUpdateModel = {
        //   UserId: this.currentUserId,
        //   UserName: formValue.UserName,
        //   UserEmail: formValue.UserEmail,
        //   UserPhone: formValue.UserPhone,
        //   UserAddress: formValue.UserAddress,
        //   UserBirth: formValue.UserBirth,
        //   UserRole: formValue.UserRole
        // };
  
        // if (formValue.UserEncryptedPassword) {
        //   updateData.UserEncryptedPassword = formValue.UserEncryptedPassword;
        // }
        const updateData: UserUpdateModel = {
          ...(formValue.UserName && { UserName: formValue.UserName }),
          ...(formValue.UserEmail && { UserEmail: formValue.UserEmail }),
          ...(formValue.UserPhone && { UserPhone: formValue.UserPhone }),
          ...(formValue.UserAddress && { UserAddress: formValue.UserAddress }),
          ...(formValue.UserBirth && { UserBirth: formValue.UserBirth }),
          ...(formValue.UserRole && { UserRole: formValue.UserRole }),
          ...(formValue.UserEncryptedPassword && { UserEncryptedPassword: formValue.UserEncryptedPassword })
        };
        
        console.log('Sending update data:', updateData); // Add logging to debug
  
        this.userService.updateUser(updateData).subscribe({
          next: () => {
            this.showSnackBar('המשתמש עודכן בהצלחה', 'success');
            this.cancelForm();
            this.loadUsers();
          },
          error: (error) => {
            console.error('שגיאה בעדכון המשתמש:', error);
            console.error('Error details:', error.error); // Log server error details
            this.showSnackBar('שגיאה בעדכון המשתמש', 'error');
            this.isLoading = false;
          }
        });
      }
      else {
        const newUser: RegisterPostModel = new RegisterPostModel(
          undefined, // id
          formValue.UserName, 
          formValue.UserEmail, 
          formValue.UserEncryptedPassword, 
          formValue.UserRole,
          formValue.UserPhone || '',
          formValue.UserAddress || '',
          formValue.UserBirth || new Date(),
          new Date()
        );
  
        this.userService.addUser(newUser).subscribe({
          next: () => {
            this.showSnackBar('המשתמש נוסף בהצלחה', 'success');
            this.cancelForm();
            this.loadUsers();
          },
          error: (error) => {
            console.error('שגיאה בהוספת המשתמש:', error);
            this.showSnackBar('שגיאה בהוספת המשתמש', 'error');
            this.isLoading = false;
          }
        });
      }
    } else {
      this.showSnackBar('אנא מלא את כל השדות הנדרשים', 'error');
    }
  }

  cancelForm(): void {
    this.showUserForm = false;
    this.isEditMode = false;
    this.currentUserId = undefined;
    this.initializeForm();
    this.isLoading = false;
  }

  confirmDeleteUser(user: UserModel): void {
    console.log('Attempting to delete user:', user); // הוסף לוג לבדיקה
    
    if (!user.UserId) {
      console.error('Cannot delete user without ID:', user);
      this.showSnackBar('לא ניתן למחוק משתמש ללא מזהה', 'error');
      return;
    }

    const confirmed = confirm(`האם אתה בטוח שברצונך למחוק את המשתמש "${user.UserName}"?`);

    if (confirmed) {
      this.deleteUser(user.UserId);
    }
  }

  deleteUser(userId: number): void {
    this.isLoading = true;
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.showSnackBar('המשתמש נמחק בהצלחה', 'success');
        this.loadUsers();
      },
      error: (error) => {
        console.error('שגיאה במחיקת המשתמש:', error);
        this.showSnackBar('שגיאה במחיקת המשתמש', 'error');
        this.isLoading = false;
      }
    });
  }

  getRoleBadgeClass(role: string): string {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'admin-badge';
      case 'user':
        return 'user-badge';
      default:
        return 'user-badge';
    }
  }

  private showSnackBar(message: string, type: 'success' | 'error' | 'info'): void {
    this.snackBar.open(message, 'סגור', {
      duration: 3000,
      panelClass: [`snackbar-${type}`],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  exportToCSV(): void {
    const csvData = this.convertToCSV(this.dataSource.data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'users_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private convertToCSV(data: UserModel[]): string {
    const headers = ['ID', 'שם משתמש', 'אימייל', 'טלפון', 'תפקיד', 'תאריך יצירה'];
    const csvContent = [
      headers.join(','),
      ...data.map(user => [
        user.UserId || '',
        user.UserName,
        user.UserEmail,
        user.UserPhone || '',
        user.UserRole,
        user.UserCreateDate ? new Date(user.UserCreateDate).toLocaleDateString('he-IL') : ''
      ].map(field => `"${field}"`).join(','))
    ];

    return csvContent.join('\n');
  }

  goBack(): void {
    this.router.navigate(['/poral-manage']);
  }
}