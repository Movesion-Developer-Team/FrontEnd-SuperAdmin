import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from '../_helpers/auth.interceptor';
import { IdentityUserDto } from '../models/register.model';
import { BaseBody } from '../models/delete.modals';
import { Player } from '../models/Player';
import { FormBuilder } from '@angular/forms';
import { CompanyDto } from '../models/company';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { GeneralResponseDto } from '../models/GeneralResponseDto';
import { Category } from '../models/category';
import { associate } from '../models/associate';

const AUTH_API = 'https://localhost:7098/Auth/';

const Company_API='https://localhost:7098/'

const Company_Delete='https://localhost:7098/Company/'

let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

 
  constructor(public http: HttpClient, private fb : FormBuilder) { }

  login(UserName: string, Password: string, 
  ): Observable<any> {
    return this.http.post(AUTH_API + 'Login', {
       UserName,
       Password,
       
    }, httpOptions);
  }

  Register(userName: string, password: string,companyId:number): Observable<IdentityUserDto> {
    return this.http.post<IdentityUserDto> (AUTH_API + 'Register/', {
       userName,
       password,
       companyId,
      
    }, httpOptions);
  }
  CreateNewCompany(name:string, address:string ,numberOfEmployees:number):Observable<CompanyDto>{
    return this.http.post<CompanyDto>(Company_API+ 'Company/CreateNewCompany',{
      name,
      address,
      numberOfEmployees
      

    },httpOptions);
  }
  CreateNewCategory(Name:string,Description:string):Observable<Category>{
    return this.http.post<Category>(Company_API+ 'Category/CreateNewCategory',{
      Name,
      Description

    },httpOptions);
  }
  

  
  // getData(): Observable<Player> {
  // return this.http.get<Player>('https://localhost:7098/Player/GetAll')

  // }
  //inja mikhastamm gheyre any bzaram error mide man interface basebody va company ro daram

 DeleteCompany(id:number):Observable<any>{
  
  return this.http.delete(`${Company_Delete}Delete?id=${id}`,httpOptions )
 
 
}

  

   
  


  addPlayer(shortName:string,fullName:string,playStoreLink:string,appStoreLink:string,linkDescription:string,color:string,categoryId:number):Observable<Player>{

    return this.http.post<Player>(Company_API+ 'Player/CreatePlayer',{

    
      shortName,fullName,categoryId,playStoreLink,appStoreLink,linkDescription,color,

    },httpOptions)
  }

  
deleteplayer(id:number):Observable<Player>{

  return this.http.delete<Player>(Company_API+ 'Player/Delete',httpOptions)
}
 




change(name:string, address:string ,numberOfEmployees:number):Observable<CompanyDto>{

  return this.http.post<CompanyDto>(Company_Delete+ 'Change',{

  },httpOptions)

}

associate(companyId:number,playerId:number):Observable<associate>{
  return this.http.post<associate>(Company_API+ 'Company/Associate',{
   companyId,
   playerId

  },httpOptions);
}

}