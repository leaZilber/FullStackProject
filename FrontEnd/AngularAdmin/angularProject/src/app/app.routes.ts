import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ChartComponent } from './components/chart/chart.component';
import { LoginAdminComponent } from './components/loginAdmin/loginAdmin.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

export const routes: Routes = [
    // { path: "loginAdmin", component: LoginAdminComponent },
    // { path: "register", component: RegisterComponent },
    // { path: "chart", component:ChartComponent},
    {path:'user-management',component:UserManagementComponent},
    { path: '', redirectTo: 'user-management', pathMatch: 'full' } 
];
