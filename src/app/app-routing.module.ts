import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserScreenComponent } from './user-screen/user-screen.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'user',
    component:UserScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
