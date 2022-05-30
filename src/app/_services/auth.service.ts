import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from '../_helpers/auth.interceptor';
import { IdentityUserDto } from '../models/register.model';
import { BaseBody } from '../models/delete.modals';
import { PlayerBodyDto } from '../models/PlayerBodyDto';
import { FormBuilder } from '@angular/forms';
import {  CreateNewCompanyBodyDto } from '../models/company';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { GeneralResponseDto } from '../models/GeneralResponseDto';
import { Category } from '../models/category';
import { AddPlayerTocompanyBodyDto } from '../models/associate';
import { CreateNewPlayerBodyDto } from '../models/CreateNewPlayerBodyDto';
import { AddPlayerToCompanyBodyDto } from '../models/AddPlayerToCompanyBodyDto';
import { companyBodyDto } from '../models/companyBodyDto';
import { CategoryBodyDto } from '../models/CategoryBodyDto';
import { 
   AssignUserToCompanyBodyDto } from '../models/AssignUserToCompanyBodyDto';
import { DiscountBodyDto } from '../models/DiscountBodyDto';
import { BaseResponse } from '../models/BaseResponse';
import {  AssignDiscountCodesToCompanyBodyDto } from '../models/AssignDiscountCodesToCompanyBodyDto';

const AUTH_API = 'https://localhost:7098/Auth/';

const Company_API='https://localhost:7098/'

const Company_Delete='https://localhost:7098/Company/'

const Company_Category= 'https://localhost:7098/Category/'

const Player_Delete = 'https://localhost:7098/Player/'

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
  CreateNewCompany(name:string, address:string ):Observable<CreateNewCompanyBodyDto>{
    return this.http.post<CreateNewCompanyBodyDto>(Company_API+ 'Company/CreateNewCompany',{
      name,
      address,
    
      

    },httpOptions);
  }

  CreateNewDiscount(id:number, name:string,linkTermsAndConditions:string,unityOfMeasurement:string ,discountValue:number,initialPrice:number,finalPrice:number,discountTypeId:number, playerId:number):Observable<DiscountBodyDto>{
    return this.http.post<DiscountBodyDto>(Company_API+ 'Discount/CreateNewDiscount',{
      id, name,linkTermsAndConditions,unityOfMeasurement,discountValue,initialPrice,finalPrice,discountTypeId, playerId
      

    },httpOptions);
  }














  CreateNewCategory( Name:string,Description:string):Observable<Category>{
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


DeleteCategory(id:number):Observable<any>{
  
  return this.http.delete(`${Company_Category}Delete?id=${id}`,httpOptions )
 
 
}

  
Deleteplayer(id:number):Observable<any>{
  
  return this.http.delete(`${Player_Delete}Delete?id=${id}`,httpOptions )
 
 
}
   
  


  addPlayer(shortName:string,fullName:string,categoryId:number,playStoreLink:string,appStoreLink:string,linkDescription:string,color:string,discountTypeId:number):Observable<CreateNewPlayerBodyDto>{

    return this.http.post<CreateNewPlayerBodyDto>(Company_API+ 'Player/CreateNewPlayer',{

    
      shortName,fullName,categoryId,playStoreLink,appStoreLink,linkDescription,color,discountTypeId

    },httpOptions)
  }

  
// deleteplayer(id:number):Observable<PlayerBodyDto>{

//   return this.http.delete<PlayerBodyDto>(Company_API+ 'Player/Delete',httpOptions)
// }
 

AssignDiscountCodesToCompany( companyId: number, discountId: number, numberOfDiscounts: number):Observable <AssignDiscountCodesToCompanyBodyDto>{
  return this.http.post<AssignDiscountCodesToCompanyBodyDto>(Company_API+ 'Discount/AssignDiscountCodesToCompany',{


  companyId,
  discountId,
numberOfDiscounts



  },httpOptions)



}


change( id:number, name:string, address:string ):Observable<companyBodyDto>{

  return this.http.post<companyBodyDto>(Company_Delete+ 'Change',{
    id,
    name,
    address,
    

  },httpOptions)

}

associate(companyId:number,playerId:number):Observable<AddPlayerTocompanyBodyDto>{
  return this.http.post<AddPlayerTocompanyBodyDto>(Company_API+ 'Player/AssignPlayerToCompany',{
   companyId,
   playerId

  },httpOptions);
}









AssignDiscountToCompany(companyId:number,discountId:number):Observable<BaseResponse>{
  return this.http.post<BaseResponse>(Company_API+ 'Discount/AssignDiscountToCompany',{
   companyId,
    discountId

  },httpOptions);
}


AssignDiscountCodesToCompanyBodyDto(discountId:number, companyId:number ,numberOfDiscounts:number,price:number):Observable <AssignDiscountCodesToCompanyBodyDto>{
  return this.http.post<AssignDiscountCodesToCompanyBodyDto>(Company_API+'Discount/AssignDiscountCodesToCompany',{

discountId,
companyId,
numberOfDiscounts,
price



  },httpOptions);
}



changecategory(id:number,  Name:string, description:string ):Observable<CategoryBodyDto>{

  return this.http.post<CategoryBodyDto>(Company_API+ 'Category/Change',{
    id,
    Name,
    description
  
  },httpOptions);
}


changeplayer(id:number,shortName:string,fullName:string,categoryId:number,playStoreLink:string,appStoreLink:string,linkDescription:string,color:string):Observable<PlayerBodyDto>{

  return this.http.post<PlayerBodyDto>(Company_API+ 'Player/Change',{
    id,shortName,fullName,categoryId,playStoreLink,appStoreLink,linkDescription,color
  
  },httpOptions);
}



assign(companyId:number,userId:string):Observable<AssignUserToCompanyBodyDto>{
  return this.http.post<AssignUserToCompanyBodyDto>(Company_API+ 'Company/AssignUserToCompany',{
     companyId,
     userId

  },httpOptions);
}

UploadCsv(discountId: Number):Observable<BaseResponse> {
  return this.http.post<BaseResponse>(Company_API+ 'Discount/UploadCsv/', {

 discountId


  },httpOptions)



}


}