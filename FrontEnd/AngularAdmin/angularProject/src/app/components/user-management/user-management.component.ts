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

export interface UserResponseModel {
  id: number;
  userName: string;
  userEmail: string;
  userRole: string;
  userPhone?: string;
  userAddress?: string;
  userBirth?: Date;
  userCreateDate?: Date;
}


export interface UserModel {
  id?: number;
  userName: string;
  userEmail: string;
  userEncryptedPassword?: string;
  userPhone?: string;
  userAddress?: string;
  userBirth?: Date;
  userRole: string;
  userCreateDate?: Date;
}

export interface UserPostModel {
  userName: string;
  userEmail: string;
  userEncryptedPassword: string;
  userPhone?: string;
  userAddress?: string;
  userBirth?: Date;
  userRole?: string;
}

export interface UserUpdateModel {
  id: number;
  userName?: string;
  userEmail?: string;
  userEncryptedPassword?: string;
  userPhone?: string;
  userAddress?: string;
  userBirth?: Date;
  userRole?: string;
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

  displayedColumns: string[] = ['id', 'userName', 'userEmail', 'userPhone', 'userRole', 'userCreateDate', 'actions'];
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
      userName: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.email]],
      userEncryptedPassword: ['', [Validators.required, Validators.minLength(6)]],
      userPhone: [''],
      userAddress: [''],
      userBirth: [null],
      userRole: ['user', [Validators.required]]
    });
  }

  private mapRegisterToUser(registerData: RegisterPostModel[]): UserModel[] {

    return registerData.map(item => ({
      userName: item.UserName || '',
      userEmail: item.UserEmail || '',
      userRole: item.UserRole || 'user',
      userPhone: item.UserPhone,
      userAddress: item.UserAddress,
      userBirth: item.UserBirth,
      userCreateDate: item.UserCreateDate
    }));
  }

  // loadUsers(): void {
  //   this.isLoading = true;
  //   this.userService.getAllUsers().subscribe({
  //     next: (registerData: RegisterPostModel[]) => {
  //       const users = this.mapRegisterToUser(registerData);
  //       this.dataSource.data = users;
  //       this.totalUsers = users.length;
  //       this.isLoading = false;
  //     },
  //     error: (error) => {
  //       console.error('שגיאה בטעינת המשתמשים:', error);
  //       this.showSnackBar('שגיאה בטעינת המשתמשים', 'error');
  //       this.isLoading = false;
  //     }
  //   });
  // }
  
  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (registerData: RegisterPostModel[]) => {
        // השתמש במיפוי המקורי שלך
        const users = this.mapRegisterToUser(registerData);
        this.dataSource.data = users;
        this.totalUsers = users.length;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('שגיאה בטעינת המשתמשים:', error);
        this.showSnackBar('שגיאה בטעינת המשתמשים', 'error');
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
    this.isEditMode = true;
    this.showUserForm = true;
    this.currentUserId = user.id;

    this.userForm.patchValue({
      userName: user.userName,
      userEmail: user.userEmail,
      userPhone: user.userPhone,
      userAddress: user.userAddress,
      userBirth: user.userBirth,
      userRole: user.userRole
    });

    this.userForm.get('userEncryptedPassword')?.clearValidators();
    this.userForm.get('userEncryptedPassword')?.updateValueAndValidity();
  }

  saveUser(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      const formValue = this.userForm.value;

      if (this.isEditMode && this.currentUserId) {
        const updateData: UserUpdateModel = {
          id: this.currentUserId,
          userName: formValue.userName,
          userEmail: formValue.userEmail,
          userPhone: formValue.userPhone,
          userAddress: formValue.userAddress,
          userBirth: formValue.userBirth,
          userRole: formValue.userRole
        };

        if (formValue.userEncryptedPassword) {
          updateData.userEncryptedPassword = formValue.userEncryptedPassword;
        }

        this.userService.updateUser(updateData).subscribe({
          next: () => {
            this.showSnackBar('המשתמש עודכן בהצלחה', 'success');
            this.cancelForm();
            this.loadUsers();
          },
          error: (error) => {
            console.error('שגיאה בעדכון המשתמש:', error);
            this.showSnackBar('שגיאה בעדכון המשתמש', 'error');
            this.isLoading = false;
          }
        });
      }
      else {
        // Create RegisterPostModel with PascalCase properties to match the expected format
        const newUser: RegisterPostModel = new RegisterPostModel(
          undefined, // id
          formValue.userName, // UserName
          formValue.userEmail, // UserEmail
          formValue.userEncryptedPassword, // UserEncryptedPassword
          formValue.userRole, // UserRole
          formValue.userPhone || '', // UserPhone
          formValue.userAddress || '', // UserAddress
          formValue.userBirth || new Date(), // UserBirth
          new Date() // UserCreateDate
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
    const confirmed = confirm(`האם אתה בטוח שברצונך למחוק את המשתמש "${user.userName}"?`);

    if (confirmed && user.id) {
      this.deleteUser(user.id);
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

  private showSnackBar(message: string, type: 'success' | 'error'): void {
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
        user.id || '',
        user.userName,
        user.userEmail,
        user.userPhone || '',
        user.userRole,
        user.userCreateDate ? new Date(user.userCreateDate).toLocaleDateString('he-IL') : ''
      ].map(field => `"${field}"`).join(','))
    ];

    return csvContent.join('\n');
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

}
