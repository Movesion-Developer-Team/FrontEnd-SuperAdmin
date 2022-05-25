import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';



import { AuthService } from '../_services/auth.service';

import { catchError, interval, map, Observable, of, switchMap, tap } from 'rxjs';
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

export interface DialogData{

}







@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  
  companyForm : FormGroup | undefined;

  isLoggedIn = false;
  isLoggedIn1 = false;

  items!: companyBodyDto[];

  asscoiationForm!:FormGroup | undefined;

  listCompany!:CreateNewCompanyBodyDto[];

  id: number | undefined ;

  listPlayer!:PlayerBodyDto[];

 assigned= false;
submitted= false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<TestComponent>,
  public fb: FormBuilder, 
  private authService: AuthService, 
  private http:HttpClient, 
  private router:Router ) {
console.log(data)
this.id = data.companyid;


this.asscoiationForm=this.fb.group({
  companyId:['',Validators.required],
  playerId:['',Validators.required]
});



this.listCompany=[];
}

    

  

   ngOnInit(): void {
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
    const {companyId, playerId}= this.asscoiationForm.value;
    this.authService.associate(companyId,playerId).pipe(
      catchError(er=> {
        alert('error');
        return of (null);
      })
    ).subscribe({
      next: data => {
        // console.log(data.companyid);
        this.assigned = true;
        this.submitted=true;
        if (this.asscoiationForm){
          this.asscoiationForm.reset();


      
        } 

         
        
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
  }




  getPlayer(){
    this.http.get<GetAllPlayerResponseDto>('https://localhost:7098/Player/GetAll').pipe(
      map(res => res.players)
    ).subscribe(res => {
      this.listPlayer = res;
    })

  }




}
