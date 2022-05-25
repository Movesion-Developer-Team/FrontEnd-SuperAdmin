import { Component, OnInit } from '@angular/core';
import { FormGroup,FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { first, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';

import { Observable, of, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/category';
import { MatDialog } from '@angular/material/dialog';
import { TestComponent } from '../test/test.component';
import { TestplayerComponentComponent } from '../testplayer/testplayer-component.component';
import { GetAllPlayerResponseDto,PlayerBodyDto,DiscountTypeBodyDto,CategoryBodyDto } from '../models/GetAllPlayerResponseDto';

import { CreateNewPlayerBodyDto } from '../models/CreateNewPlayerBodyDto';
import { NewcompanyComponent } from '../newcompany/newcompany.component';
import { AddplayerComponent} from '../addplayer/addplayer.component';



@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.css']
})
export class PlayerlistComponent implements OnInit {
   playerForm!:FormGroup
  searchTerm!: string;
  players!: PlayerBodyDto[];
  term!: string;

  listData!:PlayerBodyDto[];

  isLoggedIn = false;

  collection: any = [];
  page: any=[];
  
  items!:CategoryBodyDto[];

// salar= false;

// listinfo!:PlayerBodyDto[];
listsalar!:DiscountTypeBodyDto[]
 



  constructor(private dialog: MatDialog,private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router,private route: ActivatedRoute ){
   
    type discountTypes= PlayerBodyDto['discountTypes'] 

    //  const id=this.listData

    this.playerForm=this.fb.group({
    shortName:['',Validators.required],
    fullName:['',Validators.required],
    playStoreLink:['',Validators.required],
    appStoreLink:['',Validators.required],
    linkDescription:['',Validators.required],
    color:['',Validators.required],
    categoryId:['',Validators.required],
    id:['',Validators.required],
    
    })
  }
   


  removeItem(element:PlayerBodyDto){


    if(confirm('Are you sure you want to remove')){
  this.listData.forEach((value: any,index: any)=>{
      if(value == element )
      this.listData.splice(index,1);
  })

   this.authService.Deleteplayer(element.id).pipe(
    catchError(er=> {
     alert('there is an error');
     return of(null);
   })
  )
  .subscribe({
    next: data => {
      // console.log(data.shortName);
      this.isLoggedIn = true;
      this.listData.push(this.playerForm.value);
      this.playerForm.reset();
      
   
      
    },
    error: err => {
   alert(err);
     }
 
    });
  }
  }

  public addItem():void{
      this.listData.push(this.playerForm.value);
    
      console.log(this.listData);
         this.playerForm.reset();
  }



 
   reset(){this.playerForm.reset()}

// function RemoveElementFromArray(element: number) {
//     this.arrayElements.forEach((value,index)=>{
//         if(value==element) this.arrayElements.splice(index,1);
//     });
// }




  ngOnInit(): void {
  this.getPlayer();

  }
  
  getPlayer(){
   


    this.http.get<GetAllPlayerResponseDto>('https://localhost:7098/Player/GetAll').pipe(
      map(res => res.players)
     
    ).subscribe(res => {
      this.listData = res;
      // this.listData.forEach((element ) => console.log(element.discountTypes.forEach.bind));
      // this.listData.forEach((element ) => this.listData.push(element)
      // return res
  
      
    
      // this.listData.forEach((element) => mapTo(element.categories))
      // return this.listData;

      // )

      
    });



//     this.http.get<PlayerBodyDto>('https://localhost:7098/Player/GetAll').pipe(
//       map(res => res.discountTypes)
      
//     ).subscribe(res => {
//       this.listsalar = res;
//       // this.salar= true;
//  });
 
    



    // this.http.get<GetAllPlayerResponseDto>('https://localhost:7098/Player/GetAll').pipe(
    //   map(res => res.players)
    // ).subscribe(res => {
    //   this.listData = res;
    
    //   switchMap(res =>{
        
    //     return this.http.get<PlayerBodyDto>('https://localhost:7098/Player/GetAll')
    //     .pipe(
    //       map(res=> res.company as companyBodyDto)
    //     );
      
    //   })
    // })
    
  }
  
  onSubmit(): void {
    const { shortName,fullName,playStoreLink,appStoreLink,linkDescription,color,Category, discountTypeId} = this.playerForm.value;
    
    this.authService.addPlayer( shortName,fullName,playStoreLink,appStoreLink,linkDescription,color,Category,discountTypeId).subscribe({
      next: data => {
        console.log(data.shortName);
        this.isLoggedIn = true;
        this.listData.push(this.playerForm.value);
        this.playerForm.reset();
        
     
        
      },
      error: err => {
     
      }
    });
  }


  // getcategory(){

       
  //   let categoryId= this.route.snapshot.params['categoryId'];

    
  //   this.http.get<GetAllPlayerResponseDto>('https://localhost:7098/Category/GetAllPlayersForCurrentCategory?categoryId='+ categoryId).pipe(
  //     map(result => result.players)
  //   ).subscribe({
  //     next: data => {
  //     this.listinfo = data; 
  //   },
 
  //   })
  // }	

  
 onClickForm(item: CreateNewPlayerBodyDto){
  this.dialog.open(TestplayerComponentComponent, {
    width: '800px',
    height:'1100px',
    panelClass: 'custom-modalbox',
    data: {
      playerid: item.id
    },})
    .afterClosed().subscribe(res=>{
      this.getPlayer();
  });
}

onClickButton(){
  this.dialog.open(AddplayerComponent, {
    width: '750px',
    height:'100%',
    data: {
    
    },
  });

}



  
  

}

