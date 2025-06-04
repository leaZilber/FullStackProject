import { Routes } from '@angular/router';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { LoginAdminComponent } from './components/loginAdmin/loginAdmin.component';

export const routes: Routes = [
    {path:'user-management',component:UserManagementComponent},
    {path: 'loginAdmin',component:LoginAdminComponent },
    { path: '', redirectTo: 'loginAdmin', pathMatch: 'full' } 
];
