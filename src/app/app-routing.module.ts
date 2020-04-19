import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminDashbordComponent } from './admin/admin-dashbord/admin-dashbord.component';
import { SigninComponent } from './authentication/signin/signin.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path : 'admin/dashboard', component: AdminDashbordComponent},
  { path: 'login', component: SigninComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
