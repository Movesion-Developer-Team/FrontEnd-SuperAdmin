import { Component, OnInit } from '@angular/core';
import { FormGroup,FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { catchError, first, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { PlayerBodyDto } from '../models/PlayerBodyDto';
import { Observable, of } from 'rxjs';
import { CreateNewCompanyBodyDto } from '../models/company';
import { tokenName } from '@angular/compiler';
import { Category } from '../models/category';
import { MatDialog } from '@angular/material/dialog';
import { TestplayerComponentComponent } from '../testplayer/testplayer-component.component';
import { TestComponent } from '../test/test.component';
import{CategoryBodyDto, GetAllCategoriesResponseDto} from '../models/GetAllCategoriesResponseDto';
import { AddcategoryComponent } from '../addcategory/addcategory.component';


import { Test1Component } from '../test1/test1.component';
import { CreateNewCategoryBodyDto } from '../models/CreateNewCategoryBodyDto';
import { NewcompanyComponent } from '../newcompany/newcompany.component';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  searchTerm!: string;
  categoryForm!:FormGroup
  term!: string;
 
 listCategory!:Category [];
 isLoggedIn = false;
 listData!:CategoryBodyDto[];
 isShown: boolean = false ;

 page: any;
 
 constructor (private dialog: MatDialog,private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router ) {
   
  this.categoryForm=this.fb.group({
    Name:['',Validators.required],
    Description:['',Validators.required],

    })
  }
    



 removeItem(element: CategoryBodyDto ){
  if(confirm('Are you sure you want to remove ?')){
  // this.listCategory.forEach((value: any,index: any)=>{
  //     if(value == element )
  //     this.listCategory.splice(index,1);
  // })
  this.authService.DeleteCategory(element.id).pipe(
    catchError(er=> {
      alert('there is an error');
      return of (null);
    })
  )
  .subscribe({
    next: data => {
      // console.log(data.shortName);
      this.isLoggedIn = true;
      this.listData.push(this.categoryForm.value);
      this.categoryForm.reset();
      
   
      
    },
    error: err => {
   alert(err);
    }
  });
}
 
}
onClickForm( item:CategoryBodyDto){

  this.dialog.open(Test1Component, {
    width: '800px',
    height:'900px',
    data: { categoryid:item.id},
  })
  
  // .afterClosed().subscribe(res=>{
  //   this.getcategory();
  // });
}
   





  ngOnInit(): void {
   
  this.getcategory();
  
  
  }
  getcategory (){
    this.http.get<GetAllCategoriesResponseDto>('https://localhost:7098/Category/GetAll').pipe(
      map(res => res.categories)
    ).subscribe(res => {
      this.listData = res;
    })
    
  }


  onClickButton(){
    this.dialog.open(AddcategoryComponent, {
      width: '750px',
      // height:'100%',
      data: {
      
      },
    });
    
  

  }





}
  