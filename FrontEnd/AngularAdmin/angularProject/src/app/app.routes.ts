import { Routes } from '@angular/router';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { LoginAdminComponent } from './components/loginAdmin/loginAdmin.component';
import { RegisterComponent } from './components/register/register.component';
import { ChartComponent } from './components/chart/chart.component';
import { PoralManageComponent } from './components/poral-manage/poral-manage.component';

export const routes: Routes = [
    { path: 'user-management', component: UserManagementComponent },
    { path: 'register', component: RegisterComponent },
    {path: 'poral-manage', component: PoralManageComponent},
    { path: 'chart', component: ChartComponent },
    { path: 'loginAdmin', component: LoginAdminComponent },
    { path: '', redirectTo: 'loginAdmin', pathMatch: 'full' }
];