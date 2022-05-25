import { Component, OnInit } from '@angular/core';
import { FormGroup,FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { PlayerBodyDto } from '../models/PlayerBodyDto';
import { Observable } from 'rxjs';
import { CreateNewCompanyBodyDto } from '../models/company';
import { Category } from '../models/category';

import{CategoryBodyDto, GetAllCategoriesResponseDto} from '../models/GetAllCategoriesResponseDto'
import { CreateNewPlayerBodyDto } from '../models/CreateNewPlayerBodyDto';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ColorPickerComponent } from 'ngx-color-picker';
import { ColorFormats } from 'ngx-color-picker/lib/formats';
import { DiscountTypeBodyDto, GetAllDiscountTypesResponseDto } from '../models/GetAllDiscountTypesResponseDto';

@Component({
  selector: 'app-addplayer',
  templateUrl: './addplayer.component.html',
  styleUrls: ['./addplayer.component.css']
})
export class AddplayerComponent implements OnInit {
  playerForm!:FormGroup
  searchTerm!: string;
  players!: CreateNewPlayerBodyDto[];
  term!: string;
  items!:CategoryBodyDto[];

  isLoggedIn = false;

  CategoryForm!:FormGroup
  
  color:string= "#ff0000 "
  
  discounts!:DiscountTypeBodyDto[];
  
  constructor(private fb : FormBuilder ,
    public dialogRef: MatDialogRef<AddplayerComponent>,
    private authService: AuthService, private http:HttpClient, private router:Router,private dialog: MatDialog, ){


   




    this.items=[{
      id:0,
      name:'',
      description:''
     }];


    //  const id=this.listData

    this.playerForm=this.fb.group({
    shortName:['',Validators.required],
    fullName:['',Validators.required],
    playStoreLink:['',Validators.required],
    appStoreLink:['',Validators.required],
    linkDescription:['',Validators.required],
    color:[this.color ,Validators.required],
    categoryId:[ ,Validators.required],
    discountTypeId:[Number ,Validators.required]
    
    })
  }
   


  removeItem(element: any){
  this.items.forEach((value: any,index: any)=>{
      if(value == element )
      this.items.splice(index,1);
      
  })
}

  // public addItem():void{
  //     this.listData.push(this.playerForm.value);
    
  //     console.log(this.listData);
  //     //  this.playerForm.reset();
  // }



 
   reset(){this.playerForm.reset()}

// function RemoveElementFromArray(element: number) {
//     this.arrayElements.forEach((value,index)=>{
//         if(value==element) this.arrayElements.splice(index,1);
//     });
// }





  ngOnInit(): void {
    
    this.http.get<GetAllCategoriesResponseDto>('https://localhost:7098/Category/GetAll').pipe(

      map(res => res.categories)
    ).subscribe(res => {
      this.items = res;
      console.log(res)
    })

    this.http.get<GetAllDiscountTypesResponseDto>('https://localhost:7098/Discount/GetAllDiscountTypes').pipe(
      map(res => res.discountTypes)
    ).subscribe(res => {
      this.discounts = res;
    
    })
    

    // this.http.get<any>('https://localhost:7098/Player/GetAll')
    // .pipe(
    //   map(result=>{
    //     return result.unit as Player[];
    //   })
    // )
    //   .subscribe((data: Player[]) => {
    //     this.listData = data;
    //   });
  }
   

 getdiscount(){



 }







  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSubmit(): void {
    if (this.playerForm){
    const { shortName,fullName,playStoreLink,appStoreLink,linkDescription,color,categoryId,discountTypeId } = this.playerForm.value;
    
    this.authService.addPlayer( shortName,fullName,categoryId,playStoreLink,appStoreLink,linkDescription,color,discountTypeId).subscribe({
      next: data => {
        console.log(data.categoryId);
        this.isLoggedIn = true;
        if (this.playerForm){
          this.playerForm.reset();
          setInterval(() => {
         
            this.dialog.closeAll();
          }, 2000);
        };
     
        
      },
      error: err => {
     
      }
    });
  }
  }




//  getplayers(){
//  this.allplayers=this.authService.getData();
//   }
}

  


  