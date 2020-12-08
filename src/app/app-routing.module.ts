import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from "./index/index.component"
import { SingleproductComponent } from "./singleproduct/singleproduct.component"
import { LoginComponent } from "./login/login.component"
import { RegisterComponent } from "./register/register.component"
import { AuthGuard } from "./auth.guard";
const routes: Routes = [
  { path: 'index', component:IndexComponent,canActivate: [AuthGuard] },
  { path: 'singleproduct', component:SingleproductComponent },
  { path: 'login', component:LoginComponent },
  { path: 'register', component:RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
