import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { companyBodyDto, GetAllCompaniesResponseDto } from '../models/GetAllCompaniesResponseDto';
import { GetAllUsersBodyDto, UserDto } from '../models/GetAllUsersBodyDto';
import { GetDiscountLimitResponseDto } from '../models/GetDiscountLimitResponseDto';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-assign-user',
  templateUrl: './assign-user.component.html',
  styleUrls: ['./assign-user.component.css']
})




export class AssignUserComponent implements OnInit {
 listcompany!:companyBodyDto[];
 listData!:UserDto[];
 assignform!:FormGroup;

 isLoggedIn = false;



 constructor( private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router) {





  this.assignform=this.fb.group({
    companyId:['',Validators.required],
    userId:['',Validators.required]
  });
  }

  ngOnInit(): void {

  this.http.get<GetAllUsersBodyDto>('https://localhost:7098/Auth/GetAllUsers').pipe(
      map(res => res.users)
    ).subscribe(res => {
      // console.log(this.listData);
      this.listData = res;
      
    })

    this.getcompany();
  }

  getcompany (){
    this.http.get<GetAllCompaniesResponseDto>('https://localhost:7098/Company/GetAll').pipe(
      map(res => res.companies)
    ).subscribe(res => {
      this.listcompany = res;
    })
    
  }


submit(){

  const {companyId,userId}= this.assignform.value;
  
  this.authService.assign(companyId,userId).subscribe({
    next: data => {
      // console.log(data.companyid);
      this.isLoggedIn = true;
   
      
    },
    error: err => {
   alert('THIS USER IS ALREADY ASSIGNED TO COMPANY'
   )
   return  (null)
    }
  });


}









}
