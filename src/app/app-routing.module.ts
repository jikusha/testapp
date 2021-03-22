import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { AuthGuard } from './auth.guard';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { MessageComponent } from './messages/message/message.component';


import { AddUserComponent } from './User/add-user/add-user.component';


import { RegisterComponent } from './User/register/register.component';
import { SigninComponent } from './User/signin/signin.component';
import { UpdateComponent } from './User/update/update.component';
import { UserDetailGuard } from './User/user-detail.guard';
import { UserDetailComponent } from './User/user-detail/user-detail.component';
import { UserListComponent } from './User/user-list/user-list.component';

const routes: Routes = [
  {path:'users', canActivate: [AuthGuard], component:UserListComponent},
  {path:'users/:id',component:UserDetailComponent},
  {path: 'contacts', canActivate: [AuthGuard], component: ContactListComponent},
  {path: 'addcontact', canActivate: [AuthGuard], component: AddContactComponent},
  {path:'add', canActivate: [AuthGuard], component:AddUserComponent},
  {path:'update',component:UpdateComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forget', component: ForgetPasswordComponent},
  {
    path: 'messages',
    component: MessageComponent,
    outlet: 'popup'
  },
  {path:'',redirectTo:'users',pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
