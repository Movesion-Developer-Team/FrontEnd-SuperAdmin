import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';



import { AuthService } from '../_services/auth.service';

import { map, Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseBody } from '../models/delete.modals';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{CreateNewCompanyBodyDto} from '../models/company'
import { Router } from '@angular/router';
import { companyBodyDto } from '../models/companyBodyDto';

import { CategoryBodyDto, GetAllCategoriesResponseDto } from '../models/GetAllCategoriesResponseDto';
import { CreateNewCategoryBodyDto } from '../models/CreateNewCategoryBodyDto';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {
  items!:CategoryBodyDto[]
  categoryForm!:FormGroup 
  isLoggedIn = false;
  listData!:CategoryBodyDto[];
  id: number | undefined ;

  listCategory!:CategoryBodyDto[];



constructor(@Inject(MAT_DIALOG_DATA)
 public data: any,
 public fb: FormBuilder,
 private dialog: MatDialog,
 private authService: AuthService,
 private http:HttpClient,
 private router:Router,
 public dialogRef: MatDialogRef<Test1Component>,
    
  ) {
    
    console.log(data)
    this.id = data.categoryid;
  
  
  // this.categoryForm=this.fb.group({
    
  // id:['',Validators.required],
  // Name:['',Validators.required],
  // Description:['',Validators.required],
  // })

  this.listCategory=[];
}

onNoClick(): void {
  this.dialogRef.close();
}

closethis(){
  this.dialog.closeAll();
}

ngOnInit(): void { 
  this.getcategory();
  
  this.http.get<GetAllCategoriesResponseDto>('https://localhost:7098/Category/GetAll').pipe(
  tap(res =>{this.listCategory= res.categories} ),
  switchMap(res =>{
    
    return this.http.get<any>('https://localhost:7098/Category/FindById?id='+this.id)
    .pipe(
      map(res=> res.category as CategoryBodyDto)
    );
  
  })

).subscribe(categoryInfo => {

  this.categoryForm=this.fb.group({
    id:[categoryInfo.id,Validators.required],
    Name:[categoryInfo.name,Validators.required],
    description:[categoryInfo.description,Validators.required],


    })
})





  }

  getcategory (){
    this.http.get<GetAllCategoriesResponseDto>('https://localhost:7098/Category/GetAll').pipe(
      map(res => res.categories)
    ).subscribe(res => {
      this.listData = res;
    })
    
  }

  
onSubmit(): void {
if(this.categoryForm){
console.log(this.categoryForm)
  const { id,Name,description } = this.categoryForm.value;
 
  this.authService.changecategory(id,Name,description).subscribe({
    next: data => {
      console.log(data.Name);
      this.isLoggedIn = true;
      if (this.categoryForm){
      this.categoryForm.reset();
      }
      // this.router.navigateByUrl('/superadmin/category');
      
    },
    error: err => {
   
    }
  });

}
}}

