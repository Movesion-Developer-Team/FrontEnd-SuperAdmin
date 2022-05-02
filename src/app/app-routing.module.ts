import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';

import { SuperadminComponent } from './superadmin/superadmin.component';
import { NewcompanyComponent } from './newcompany/newcompany.component';
import { ModificationComponent } from './modification/modification.component';
import { AddplayerComponent } from './addplayer/addplayer.component';
import { CategoryComponent } from './category/category.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { PlayerlistComponent } from './playerlist/playerlist.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { TestComponent } from './test/test.component';
import { VoucherComponent } from './voucher/voucher.component';
import { AssociationComponent } from './association/association.component';

import { Test1Component } from './test1/test1.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'profile', component: ProfileComponent },
  // { path: 'user', component: BoardUserComponent },
  // { path: 'mod', component: BoardModeratorComponent },
  // { path: 'admin', component: BoardAdminComponent },
  { path: 'superadmin', component: SuperadminComponent,
  children:[
    { path:'newcompany' ,component:NewcompanyComponent},
    {path:'newadmin',component:SuperadminComponent},
    {path:'modification',component:ModificationComponent},
    {path:'addplayer',component:AddplayerComponent }  ,   
    {path:'category',component:CategoryComponent }  ,  
    {path:'companylist', component:CompanyListComponent},
    {path:'playerlist', component:PlayerlistComponent},
    {path:'addcategory', component:AddcategoryComponent},
    {path:'Voucher', component:VoucherComponent},
    {path:'test', component:TestComponent},
    {path:'test1', component:Test1Component},
    {path:'association',component:AssociationComponent},


  
  ]
},




  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
