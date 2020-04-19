import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminDashbordComponent } from './admin/admin-dashbord/admin-dashbord.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path : 'admin/dashboard', component: AdminDashbordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
