import { FocusTrapManager } from '@angular/cdk/a11y/focus-trap/focus-trap-manager';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { GenericResponseDtoAlberto } from '../generic.response';
import { Category } from '../models/category';
import { CreateNewPlayerBodyDto } from '../models/CreateNewPlayerBodyDto';
import { GetAllCategoriesResponseDto } from '../models/GetAllCategoriesResponseDto';
import { GetAllPlayerResponseDto,PlayerBodyDto } from '../models/GetAllPlayerResponseDto';
import { PlayerMainResponseDto } from '../models/PlayerBodyDto';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-testplayer-component',
  templateUrl: './testplayer-component.component.html',
  styleUrls: ['./testplayer-component.component.css']
})
export class TestplayerComponentComponent implements OnInit {


  
  playerForm!:FormGroup| undefined ;
  listData:any;
  isLoggedIn = false;
  listPlayer!:PlayerBodyDto[];
  id: number | undefined ;

fileForm!:FormGroup;


  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<TestplayerComponentComponent>,
    private dialog: MatDialog,
  public fb: FormBuilder, 
  private authService: AuthService, 
  private http:HttpClient, 
  private router:Router) {
    console.log(data)
    this.id = data.playerid;




     
    
    this.listPlayer=[];
  
    this.fileForm=this.fb.group({
     playerId:[this.id,Validators.required],
      name: ['', Validators.required, Validators.minLength(3)],
      file: ['', Validators.required],
      fileSource: ['', Validators.required] 
     })
    




    // this.playerForm=this.fb.group({

    //   id:[0,Validators.required],
    //   shortName:['',Validators.required],
    //   fullName:['',Validators.required],
    //   playStoreLink:['',Validators.required],
    //   appStoreLink:['',Validators.required],
    //   linkDescription:['',Validators.required],
    //   color:['',Validators.required],
    //   categoryId:['',Validators.required],
      
    //   })
    }
   




    onNoClick(): void {
      this.dialogRef.close();
    }




  ngOnInit(): void {
    this.getPlayer();
    this.http.get<GetAllPlayerResponseDto>('https://localhost:7098/Player/GetAll').pipe(
     tap(res=>{this.listPlayer=res.players}),
     switchMap(res=>{
       return this.http.get<PlayerMainResponseDto>('https://localhost:7098/Player/FindById?id=' +this.id)
       .pipe(
         map(res=> res.player)
       );
     })
    ).subscribe(playerInfo => {
   
      // this.listCompany = res;
      this.playerForm=this.fb.group({
        id:[playerInfo.id,Validators.required],
        shortName:[playerInfo.shortName,Validators.required],
        fullName:[playerInfo.fullName,Validators.required],
        playStoreLink:[playerInfo.playStoreLink,Validators.required],
        appStoreLink:[playerInfo.appStoreLink,Validators.required],
        linkDescription:[playerInfo.linkDescription,Validators.required],
        color:[playerInfo.color,Validators.required],
        categoryId:[playerInfo.categoryId,Validators.required],
        
        })
    })

  }

 

  onSubmit(): void {
    if(this.playerForm){

    
      const {id,
      shortName,fullName,categoryId,playStoreLink,appStoreLink,linkDescription,color} = this.playerForm.value;
    
    this.authService.changeplayer(id,shortName,fullName,categoryId,playStoreLink,appStoreLink,linkDescription,color).pipe()
    .subscribe({
      next: data => {
        console.log(data.shortName);
        this.isLoggedIn = true;
        if (this.playerForm){
          this.playerForm.reset();
        }
        this.dialog.closeAll();
     
        
      },
      error: err => {
     
      }
    });
  }
    
  }
  getPlayer(){
    this.http.get<GetAllPlayerResponseDto>('https://localhost:7098/Player/GetAll').pipe(
      map(res => res.players)
    ).subscribe(res => {
      this.listPlayer = res;
    })

  }
  onFileChange(event:any) {
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileForm.patchValue({
        fileSource: file
      });
    }
  }
    submit(){
      var formData = new FormData();
      formData.append( 'file',this.fileForm.get('fileSource')?.value );
    
    this.http.post('https://localhost:7098/Player/AddImageToPlayer/', formData, {params: this.fileForm.value}  )
    .subscribe(res => {
      console.log(res);
      
      alert('Uploaded Successfully.');
      
    },
    
  catchError    => { alert ('your file is either empty or already assigned')}
 
 
    
    );
    
  }
}
