import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { Router, ActivatedRoute } from '@angular/router';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { NewcompanyComponent } from './newcompany/newcompany.component';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ModificationComponent } from './modification/modification.component';
import { AddplayerComponent } from './addplayer/addplayer.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CategoryComponent } from './category/category.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PlayerlistComponent } from './playerlist/playerlist.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { TestComponent } from './test/test.component';
import { VoucherComponent } from './voucher/voucher.component';
import { AssociationComponent } from './association/association.component';

import { Test1Component } from './test1/test1.component';
import { TestplayerComponentComponent } from './testplayer/testplayer-component.component';
import { AssociationtestComponent } from './associationtest/associationtest.component';









@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    SuperadminComponent,
    NewcompanyComponent,
    ModificationComponent,
    AddplayerComponent,
    CategoryComponent,
    CompanyListComponent,
    PlayerlistComponent,
    AddcategoryComponent,
    TestComponent,
    VoucherComponent,
    AssociationComponent,
   
    Test1Component,
    TestplayerComponentComponent,
    AssociationtestComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule 
    
    
    
    
    
 

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
