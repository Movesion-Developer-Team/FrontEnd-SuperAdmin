import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { AssociationComponent } from '../association/association.component';
import { BaseResponse } from '../models/BaseResponse';

import { GetAllDiscountsForPlayerResponseDto, DiscountBodyDto } from '../models/GetAllDiscountsForPlayerResponseDto';

import { GetAllPlayerResponseDto, PlayerBodyDto } from '../models/GetAllPlayerResponseDto';
import { UploadCsvComponent } from '../upload-csv/upload-csv.component';
import { AuthService } from '../_services/auth.service';






@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css']
})
export class CodesComponent implements OnInit {
  listPlayer!: PlayerBodyDto[];
  playerForm!:FormGroup;

 discountForm!:FormGroup;
 id!:number;


 selectedPlayer: any;
 discountList!:DiscountBodyDto[]
//  myForm!:FormGroup;



 
constructor( private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router, private dialog: MatDialog, private route: ActivatedRoute) {

this.playerForm=this.fb.group({

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





onSubmit(){
console.log(this.playerForm.value);
 this.http.get<GetAllDiscountsForPlayerResponseDto> ('https://localhost:7098/Discount/GetAllDiscountsForPlayer/',{params: this.playerForm.value}).pipe(
  map(res => res.discounts)
 
).subscribe(res => {
 this.discountList = res

  // console.log(this.discountList)
});



}

Submit(){


  var formData = new FormData();
  formData.append( 'file',this.discountForm.get('fileSource')?.value );
  

  this.http.post('https://localhost:7098/Discount/UploadCsv/', formData, {params: this.discountForm.value}  )
  .subscribe(res => {
    console.log(res);
    alert('Uploaded Successfully.');
  })

//   const discountId= this.discountForm.value;


//  console.log(this.discountForm.value)
   
//   this.authService.UploadCsv( discountId).subscribe({
//     next: data => {
//       console.log(data.message);
      
     
//     },
//     error: err => {
  
//     }
//   });
}







upload(){
// const discountId= this.discountForm.value;

}



myFunction(){
  this.dialog.open(UploadCsvComponent, {
    width: '700px',
    height:'70%',
    panelClass: 'custom-modalbox',
    data: {
    
    },
  })
   
  
  


}







  
  
















}