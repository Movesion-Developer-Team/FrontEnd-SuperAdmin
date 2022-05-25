import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { companyBodyDto, GetAllCompaniesResponseDto } from '../models/GetAllCompaniesResponseDto';
import { GetAllDiscountsForPlayerResponseDto, DiscountBodyDto } from '../models/GetAllDiscountsForPlayerResponseDto';
import { GetAllPlayerResponseDto, PlayerBodyDto } from '../models/GetAllPlayerResponseDto';
import { GetDiscountLimitResponseDto, LimitBodyDto } from '../models/GetDiscountLimitResponseDto';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-discountassign',
  templateUrl: './discountassign.component.html',
  styleUrls: ['./discountassign.component.css']
})
export class DiscountassignComponent implements OnInit {
  limitlist!:LimitBodyDto ;

  playerForm!:FormGroup;
  listcompany!:companyBodyDto[];
  discountList!:DiscountBodyDto[]
  discountform! :FormGroup;
  discountcodesForm!:FormGroup;

  discountForm!:FormGroup;
  
  listPlayer!:PlayerBodyDto[];

  data:number[] = []
  limitnumber!: GetDiscountLimitResponseDto[];



  constructor(private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router,private dialog: MatDialog) {
    { this.playerForm =this.fb.group({

      playerId:['',Validators.required]
    });
    this.discountcodesForm=this.fb.group({
      discountId:['',Validators.required],
      
      
    })


    this.discountForm=this.fb.group({

     companyId:['',Validators.required],
    //  playerId:['',Validators.required],
     discountId:['',Validators.required],
     numberOfDiscounts:['',Validators.required]


    });
  }}

  ngOnInit(): void {


    this.getcompany();
    this.getPlayer();
    this.getDiscount();
  //  this.GetDiscountLimitResponseDto();
  }






  getcompany (){
    this.http.get<GetAllCompaniesResponseDto>('https://localhost:7098/Company/GetAll').pipe(
      map(res => res.companies)
    ).subscribe(res => {
      this.listcompany = res;

     
    })
    
  }


  getPlayer(){
   


    this.http.get<GetAllPlayerResponseDto>('https://localhost:7098/Player/GetAll').pipe(
      map(res => res.players)
     
    ).subscribe(res => {
      this.listPlayer = res;
      console.log(this.playerForm.value)
    });
  }


  getDiscount(){
    console.log(this.playerForm.value);
     this.http.get<GetAllDiscountsForPlayerResponseDto> ('https://localhost:7098/Discount/GetAllDiscountsForPlayer/',{params: this.playerForm.value}).pipe(
      map(res => res.discounts)
    ).subscribe(res => {
     this.discountList = res
    //  this.isSubmitted=true;
    
      // this.router.navigate(['superadmin/Codes']
  
      
    }
       
    );
    
    
    }







    
submit(){
  console.log(this.discountForm.value)
  const{companyId,discountId,numberOfDiscounts}= this.discountForm.value;
  
    this.authService.AssignDiscountCodesToCompany(companyId,discountId,numberOfDiscounts).subscribe({
      next: data => {
        // console.log(data.companyid);
       
     
        
      },
      error: err => {
     alert('error'
     )
     return  (null)
      }
    });
  }






  GetDiscountLimitResponseDto(){
    

     var salar= this.discountForm.get('discountId')?.value

    this.http.get<GetDiscountLimitResponseDto>('https://localhost:7098/Discount/GetDiscountLimit?discountId='+ salar ).pipe(
      map(res => res.limit)

    ).subscribe(res => {
     this.limitlist = res;
  console.log(this.limitlist)
  this.data.push(res.limitValue);
      
    }
    
    )
  }

 
     
    
    
  //ssad
  
  

  
}
