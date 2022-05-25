import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { AssociationComponent } from '../association/association.component';
import { BaseResponse } from '../models/BaseResponse';

import { GetAllDiscountsForPlayerResponseDto, DiscountBodyDto } from '../models/GetAllDiscountsForPlayerResponseDto';

import { GetAllPlayerResponseDto, PlayerBodyDto } from '../models/GetAllPlayerResponseDto';

import { AuthService } from '../_services/auth.service';

import { AppService } from '../models/appService';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.css']
})
export class UploadCsvComponent implements OnInit {
 listPlayer!: PlayerBodyDto[];
  playerForm!:FormGroup;
 discountForm!:FormGroup;
 id!:number;
 isSubmitted:boolean = false
 selectedPlayer: any;
 discountList!:DiscountBodyDto[]







  constructor( private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router, private dialog: MatDialog, private route: ActivatedRoute,  
    public dialogRef: MatDialogRef<UploadCsvComponent>,
) 
  
  
  
  
  { this.playerForm=this.fb.group({

    playerId:['',Validators.required]
  });
  
  this.discountForm=this.fb.group({
    discountId:['',Validators.required],
    name: ['', Validators.required, Validators.minLength(3)],
    file: ['', Validators.required],
    fileSource: ['', Validators.required]
    
  })
  }
  
  
  get f(){
    return this.discountForm.controls;
  }
  
  
  onFileChange(event:any) {
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.discountForm.patchValue({
        fileSource: file
      });
    }
  }
     

  ngOnInit(): void {
    this.getPlayer();
    }
  
   
  
    getPlayer(){
      this.http.get<GetAllPlayerResponseDto>('https://localhost:7098/Player/GetAll').pipe(
        map(res => res.players)
       
      ).subscribe(res => {
        this.listPlayer = res;
        console.log(this.playerForm.value);
  
      });
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    closethis(){
      this.dialog.closeAll();
    }
  
  
  onSubmit(){
  console.log(this.playerForm.value);
   this.http.get<GetAllDiscountsForPlayerResponseDto> ('https://localhost:7098/Discount/GetAllDiscountsForPlayer/',{params: this.playerForm.value}).pipe(
    map(res => res.discounts)
  ).subscribe(res => {
   this.discountList = res
   this.isSubmitted=true;
  
    // this.router.navigate(['superadmin/Codes'])

    
  }
     
  );
  
  
  }
  
  Submit(){
  
    var formData = new FormData();
    formData.append( 'file',this.discountForm.get('fileSource')?.value );
  
    this.http.post('https://localhost:7098/Discount/UploadCsv/', formData, {params: this.discountForm.value}  )
    .subscribe(res => {
      console.log(res);
      
      alert('Uploaded Successfully.');
      
    },
    
  catchError    => { alert ('your file is either empty or already assigned')}
 
 
    
    );
  }




 
  
  
  
  

  
  }