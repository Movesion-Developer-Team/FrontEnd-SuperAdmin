import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';



import { AuthService } from '../_services/auth.service';

import { catchError, interval, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseBody } from '../models/delete.modals';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{CreateNewCompanyBodyDto} from '../models/company'
import { Router } from '@angular/router';
import { companyBodyDto } from '../models/companyBodyDto';
import { GetAllCompaniesResponseDto } from '../models/GetAllCompaniesResponseDto';
import { CompanyMainResponseDto } from '../models/CompanyMainResponseDto';
import { CreateNewPlayerBodyDto } from '../models/CreateNewPlayerBodyDto';
import { GetAllPlayerResponseDto,PlayerBodyDto } from '../models/GetAllPlayerResponseDto';
import { AddPlayerToCompanyBodyDto } from '../models/AddPlayerToCompanyBodyDto';
import { GetAllDiscountsForPlayerResponseDto, DiscountBodyDto } from '../models/GetAllDiscountsForPlayerResponseDto';
import { GetAllPlayersForCurrentCompanyResponseDto, players } from '../models/GetAllPlayersForCurrentCompanyResponseDto';
import { Alert } from '../models/alert';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GetDiscountLimitResponseDto, LimitBodyDto } from '../models/GetDiscountLimitResponseDto';

export interface DialogData{

}







@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  
  companyForm !: FormGroup;

  isLoggedIn = false;
  isLoggedIn1 = false;

  items!: companyBodyDto[];
  asscoiationForm!:FormGroup;

  listCompany!:CreateNewCompanyBodyDto[];
  id: number  ;
  listPlayer!:PlayerBodyDto[];

   idOfPlayer!: number ;
  discountList!:DiscountBodyDto[]
  GetAllPlayersForaCompany!:FormGroup;

  GetAllPlayersForOneCompanyList!:players[];
  GetAllDiscountsForPlayerOfCompanyList!:DiscountBodyDto[];


  GetAllDiscountForaplayer!:FormGroup;
 selected=false;
 assigned= false;
 submitted= false;
 accepted= false;
 GetAllDiscountCodesList!:FormGroup;
 quantity!:FormGroup;


 limitlist!:LimitBodyDto ;
 data1:number[] = []




  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<TestComponent>,
  public fb: FormBuilder, 
  private authService: AuthService, 
  private http:HttpClient, 
  private router:Router ) {

this.id = data.companyid;


this.asscoiationForm=this.fb.group({
  companyId:[this.data.companyid ,Validators.required],
  playerId:['',Validators.required]
});

this.GetAllPlayersForaCompany=this.fb.group({
  playerId:['',Validators.required]
});


this.GetAllDiscountForaplayer=this.fb.group({
  discountId:['',Validators.required]
})


this.quantity=this.fb.group({
  numberOfDiscountCodes:['',Validators.required],
  price:['',Validators.required]
})

this.GetAllDiscountCodesList=this.fb.group({
  discountId:['',Validators.required]
})



this.listCompany=[];
}

    

  

   ngOnInit(): void {

    
   this.GetAllDiscountsForPlayerOfCompany();
     this.getPlayer();
    this.http.get<GetAllCompaniesResponseDto>('https://localhost:7098/Company/GetAll').pipe(
      tap(res =>{this.listCompany= res.companies} ),
      switchMap(res =>{
        
        return this.http.get<any>('https://localhost:7098/Company/FindById?id='+this.id)
        .pipe(
          map(res=> res.company as companyBodyDto)
        );
      
      })

    ).subscribe(companyInfo => {

      this.companyForm=this.fb.group({
        id:[companyInfo.id,Validators.required],
        name:[companyInfo.name,Validators.required],
        address:[companyInfo.address,Validators.required],
       
    
        })
    })



  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closethis(){
    this.dialog.closeAll();
  }

  onSubmit(): void {
    


    if (this.companyForm){
    const { id,name, address} = this.companyForm.value;
   
    this.authService.change( id,name, address,)
    .pipe( )
    .subscribe({
      next: data => {
        // console.log(data.shortName);
        this.isLoggedIn1 = true;
        // this.listData.push(this.companyForm.value);
        if (this.companyForm){
          this.companyForm.reset();
          
        }
        this.dialog.closeAll();
      
        
      },
      error: err => {
     
      }
    });
  }
  }
  


  submit() {
    
    if (this.asscoiationForm){
    console.log('values to submit', this.asscoiationForm.value);
    const companyId=this.asscoiationForm.get('companyId')?.value;
    const playerId=this.asscoiationForm.get('playerId')?.value
    this.authService.associate(companyId,playerId).pipe(
      catchError(err=> {
        alert('Error occurred');
        return throwError(err);
        
      })
    ).subscribe({
      next: data => {
        // console.log(data.companyid);
        this.assigned = true;
        this.submitted=true;
       
      this.asscoiationForm.reset();
      


      
        

         
        
        // this.dialog.closeAll();
      
       
// this.router.navigateByUrl('/superadmin/associationlist');
      
      
      },
      error: err => {

        // if(HttpResponse.status==400) { alert('there is an error');
        // return of (null);}
        // else if(HttpResponse.status==200) {}
       
      }
    });
  }

  this.getDiscount()
  }




  getPlayer(){
    this.http.get<GetAllPlayerResponseDto>('https://localhost:7098/Player/GetAll').pipe(
      map(res => res.players)
    ).subscribe(res => {
      this.listPlayer = res;
    })

  }










  getDiscount(){
    
    var lon=this.GetAllPlayersForaCompany.get('playerId')?.value;
    console.log(lon)
     this.http.get<GetAllDiscountsForPlayerResponseDto> ('https://localhost:7098/Discount/GetAllDiscountsForPlayer?playerId='+ lon).pipe(
      map(res => res.discounts)
    ).subscribe(res => {
     this.discountList = res
    //  this.isSubmi
    console.log(this.discountList)
      // this.router.navigate(['superadmin/Codes']
  
      
    }
       
    );
   
    }





    GetAllDiscountsForPlayerOfCompany(){

      var lon=this.GetAllPlayersForaCompany.get('playerId')?.value;
     var lin= this.asscoiationForm.get('companyId')?.value
     console.log( lon);
      
      this.http.get<GetAllDiscountsForPlayerResponseDto> ('https://localhost:7098/Discount/GetAllDiscountsForPlayerOfCompany?playerId=' +lon+ '&companyId='+lin ).pipe(
        map(res => res.discounts)
      ).subscribe(res => {
       this.GetAllDiscountsForPlayerOfCompanyList = res
      //  this.isSubmi
      console.log(this.GetAllDiscountsForPlayerOfCompanyList)
        // this.router.navigate(['superadmin/Codes']
    
        
      }
         
      );
      

    }




    GetAllPlayersForOneCompany(){
      var lin= this.asscoiationForm.get('companyId')?.value

      console.log(lin)
      this.http.get<GetAllPlayersForCurrentCompanyResponseDto> ('https://localhost:7098/Company/GetAllPlayersForOneCompany?companyId='+lin ).pipe(
        map(res => res.players)
      ).subscribe(res => {
       this.GetAllPlayersForOneCompanyList = res
      //  this.isSubmi
      console.log(this.GetAllPlayersForOneCompanyList)
        // this.router.navigate(['superadmin/Codes']
        this.selected=true
        
      }
         
      );
    }




    apply(){}


assignDtoC(){

const companyId=this.asscoiationForm.get('companyId')?.value;
const discountId=this.GetAllDiscountForaplayer.get('discountId')?.value;

console.log(companyId, discountId);

this.authService.AssignDiscountToCompany(companyId,discountId).pipe().subscribe({
  next:data =>{
alert('succesfull')
    // this.dialog.closeAll()
  },
  error:err=>{
    alert('your discount is already assigned to this company')

  }
});
}




AssignDiscountCodesToCompanyBodyDto(){

  const companyId=this.asscoiationForm.get('companyId')?.value;
  const discountId= this.GetAllDiscountCodesList.get('discountId')?.value ;
  const numberOfDiscounts =this.quantity.get('numberOfDiscountCodes')?.value;
  const price = this.quantity.get('price')?.value;

console.log(discountId,companyId,numberOfDiscounts, price)

this.authService.AssignDiscountCodesToCompanyBodyDto(discountId,companyId,numberOfDiscounts,price).pipe().subscribe({
  next:data =>{
this.accepted = true;

   
  },
  error:err=>{
    alert('exceeding the limit')

  }
});


}




Availability(){
    

  var info=  this.GetAllDiscountCodesList.get('discountId')?.value ;

  console.log(info);

 this.http.get<GetDiscountLimitResponseDto>('https://localhost:7098/Discount/GetDiscountLimit?discountId='+ info ).pipe(
   map(res => res.limit)

 ).subscribe(res => {
  this.limitlist = res;
console.log(this.limitlist)
this.data1.push(res.limitValue);
   
 }
 
 )
}



}







