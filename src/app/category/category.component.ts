import { Component, OnInit } from '@angular/core';
import { FormGroup,FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/Player';
import { Observable } from 'rxjs';
import { CompanyDto, GenericResponseDto } from '../models/company';
import { tokenName } from '@angular/compiler';
import { Category } from '../models/category';
import { MatDialog } from '@angular/material/dialog';
import { TestplayerComponentComponent } from '../testplayer/testplayer-component.component';
import { TestComponent } from '../test/test.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  searchTerm!: string;
  
  term!: string;
 
 listCategory!:Category[];


 isShown: boolean = false ;

 page: any;
 
 constructor (private dialog: MatDialog,private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router ) {}
    

 modalContent = false;
 openSortingModal(){
   this.modalContent = true;
   
 }



 closeModal(){
  this.modalContent = false;
 }

 removeItem(element: any ){
      
  this.listCategory.forEach((value: any,index: any)=>{
      if(value == element )
      this.listCategory.splice(index,1);
  })
  
 
}
onClickForm(){

  this.dialog.open(TestComponent, {
    width: '600px',
    height:'600px',
    data: {},
  });
}




  ngOnInit(): void {
    this.http.get<GenericResponseDto<Category[]>>('https://localhost:7098/Category/GetAll')
    .pipe(
      map(result => result.unit)
    )

    .subscribe((data: Category[]) => {
      this.listCategory = data;
    });
  
  }}