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
import { CompanyDto } from '../models/company';
import { Category } from '../models/category';



@Component({
  selector: 'app-addplayer',
  templateUrl: './addplayer.component.html',
  styleUrls: ['./addplayer.component.css']
})
export class AddplayerComponent implements OnInit {
  playerForm!:FormGroup
  searchTerm!: string;
  players!: Player[];
  term!: string;

  listData:any;

  isLoggedIn = false;

  CategoryForm!:FormGroup
  

  constructor(private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router ){
   
    this.listData=[{
      shortName: '',
      fullName: '',
      playStoreLink : '',
      appStoreLink:'',
      linkDescription:'',
      color :'',
      categoryId:0
     }];

    //  const id=this.listData

    this.playerForm=this.fb.group({
    shortName:['',Validators.required],
    fullName:['',Validators.required],
    playStoreLink:['',Validators.required],
    appStoreLink:['',Validators.required],
    linkDescription:['',Validators.required],
    color:['',Validators.required],
    categoryId:['',Validators.required],
    
    })
  }
   


  removeItem(element: any){
  this.listData.forEach((value: any,index: any)=>{
      if(value == element )
      this.listData.splice(index,1);
      
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





  ngOnInit(): void {this.http.get<any>('https://localhost:7098/Category/GetAll')
  .pipe(
    map(result=>{
      return result.unit as Category[];
    })
  )

  .subscribe((data: Category[]) => {
    this.listData = data;
  });



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
   
  
  
  onSubmit(): void {
    const { shortName,fullName,playStoreLink,appStoreLink,linkDescription,color,categoryId } = this.playerForm.value;
    
    this.authService.addPlayer( shortName,fullName,playStoreLink,appStoreLink,linkDescription,color,categoryId).subscribe({
      next: data => {
        console.log(data.shortName);
        this.isLoggedIn = true;
        this.listData.push(this.playerForm.value);
        this.playerForm.reset();
        this.router.navigateByUrl('/superadmin/playerlist');
     
        
      },
      error: err => {
     
      }
    });
  }




//  getplayers(){
//  this.allplayers=this.authService.getData();
//   }
}

  


  