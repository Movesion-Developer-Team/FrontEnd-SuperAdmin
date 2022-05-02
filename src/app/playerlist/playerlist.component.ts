import { Component, OnInit } from '@angular/core';
import { FormGroup,FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/Player';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/category';
import { MatDialog } from '@angular/material/dialog';
import { TestComponent } from '../test/test.component';
import { TestplayerComponentComponent } from '../testplayer/testplayer-component.component';

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.css']
})
export class PlayerlistComponent implements OnInit {
   playerForm!:FormGroup
  searchTerm!: string;
  players!: Player[];
  term!: string;

  listData:any;

  isLoggedIn = false;

  collection: any = [];
  page: any;
  

  constructor(private dialog: MatDialog,private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router ){
   
    this.listData=[{
      shortName: '',
      fullName: '',
      playStoreLink : '',
      appStoreLink:'',
      linkDescription:'',
      color :''
     }];

    //  const id=this.listData

    this.playerForm=this.fb.group({
    shortName:['',Validators.required],
    fullName:['',Validators.required],
    playStoreLink:['',Validators.required],
    appStoreLink:['',Validators.required],
    linkDescription:['',Validators.required],
    color:['',Validators.required]
    
    })
  }
   


  removeItem(element: Player){
  this.listData.forEach((value: any,index: any)=>{
      if(value == element )
      this.listData.splice(index,1);
  })

  this.authService.deleteplayer(element.id).pipe(
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
    this.http.get<any>('https://localhost:7098/Player/GetAll')
    .pipe(
      map(result=>{
        return result.unit as Player[];
      })
    )
      .subscribe((data: Player[]) => {
        this.listData = data;
      });
  }
   gohere(){
     this.router.navigateByUrl('/superadmin/addcategory')
   }
  
  
  onSubmit(): void {
    const { shortName,fullName,playStoreLink,appStoreLink,linkDescription,color,Category} = this.playerForm.value;
    
    this.authService.addPlayer( shortName,fullName,playStoreLink,appStoreLink,linkDescription,color,Category).subscribe({
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


  
 onClickForm(item: Player){
  this.dialog.open(TestplayerComponentComponent, {
    width: '600px',
    height:'600px',
    data: {
    
    },
  });
}



//  getplayers(){
//  this.allplayers=this.authService.getData();
//   }
}

  


  
  



