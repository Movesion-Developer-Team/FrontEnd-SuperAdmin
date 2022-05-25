import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { DiscountTypeBodyDto, GetAllDiscountTypesResponseDto } from '../models/GetAllDiscountTypesResponseDto';
import { GetAllPlayerResponseDto, PlayerBodyDto } from '../models/GetAllPlayerResponseDto';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit { 

  discounts!:DiscountTypeBodyDto[];
  discountForm!:FormGroup;

  isLoggedIn = false;

  listPlayer!: PlayerBodyDto[]

  constructor(private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router, private dialog: MatDialog,) {



    this.discountForm=this.fb.group({
      id:['',Validators.required],
      name:['',Validators.required],
      linkTermsAndConditions:['',Validators.required],
      unityOfMeasurement:['',Validators.required],
      discountValue:['',Validators.required],
      initialPrice:['',Validators.required],
      finalPrice:['',Validators.required],
      discountTypeId:['',Validators.required],
      playerId :['',Validators.required],




    })
  }


  onSubmit(){ if (this.discountForm){
    const {id, name,linkTermsAndConditions,unityOfMeasurement,discountValue,initialPrice,finalPrice,discountTypeId, playerId} = this.discountForm.value;
   
    this.authService.CreateNewDiscount(id, name,linkTermsAndConditions,unityOfMeasurement,discountValue,initialPrice,finalPrice,discountTypeId, playerId).subscribe({
      next: data => {
   
        this.isLoggedIn = true;
        if (this.discountForm){
          this.discountForm.reset();
          setInterval(() => {
         
            this.dialog.closeAll();
          }, 2000);
        }
        
      
       
        
        
      },
      error: err => {
     
      }
    });
  }



  }




  border() {
    //you can do whatever you want, pass in value, or variables
    return {
       border: '2px ',
       backgroundColor:'',
       display: 'block',
       }
    }






  ngOnInit(): void {

    this.getPlayer();
    this.getDiscount();
  }




  getPlayer(){
    this.http.get<GetAllPlayerResponseDto>('https://localhost:7098/Player/GetAll').pipe(
      map(res => res.players)
     
    ).subscribe(res => {
      this.listPlayer = res;
      
    });
  }
  

getDiscount(){
  this.http.get<GetAllDiscountTypesResponseDto>('https://localhost:7098/Discount/GetAllDiscountTypes').pipe(
    map(res => res.discountTypes)
  ).subscribe(res => {
    this.discounts = res;
  
  })


  
  }
}
