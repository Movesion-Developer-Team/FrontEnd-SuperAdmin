import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CompanyDto } from '../models/company';
import { Player } from '../models/Player';
import { AuthService } from '../_services/auth.service';
import { associate, GenericResponseDto } from '../models/associate';
import { MatDialog } from '@angular/material/dialog';
import { TestComponent } from '../test/test.component';
import { AssociationtestComponent } from '../associationtest/associationtest.component';


@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})
export class AssociationComponent implements OnInit {
  asscoiationForm!:FormGroup;
  

  listPlayer:Player[] = [];
  listCompany:CompanyDto[] = [];
  
  isLoggedIn = false;


  term!: string;

  listData!:associate[]
  page: any;
  isShown: boolean = false ;

 
  constructor(private dialog:MatDialog, private fb : FormBuilder,private authService: AuthService, private http:HttpClient, private router:Router ) {
    

    
    this.asscoiationForm=this.fb.group({
      companyId:['',Validators.required],
      playerId:['',Validators.required]
    });


  
this.listCompany=[];
  }


  ngOnInit(): void {
  
   

    this.http.get<any>('https://localhost:7098/Player/GetAll')
    .pipe(
      map(result=>{
        return result.unit as Player[];
      })
    )
      .subscribe((data: Player[]) => {
        this.listPlayer = data;
      });
     


      this.http.get<any>('https://localhost:7098/Company/GetAll')
      .pipe(
        map(result=>{
          return result.unit as CompanyDto[];
        })
      )
      .subscribe((data: CompanyDto[]) => {
        this.listCompany = data;
      });


      this.http.get<GenericResponseDto<associate[]>>('https://localhost:7098/Company/GetAll')
      .pipe(
        map(result => result.unit)
      )
  
      .subscribe((data: associate[]) => {
        this.listData = data;
      });

      
  }

  modalContent = false;
  openSortingModal(){
    this.modalContent = true;
    
  }
  closeModal(){
   this.modalContent = false;
  }

  removeItem(element: any ){
      
    this.listData.forEach((value: any,index: any)=>{
        if(value == element )
        this.listData.splice(index,1);
    })
   
  }

  onClickForm(){
    this.dialog.open(AssociationtestComponent, {
      width: '600px',
      height:'600px',
      data: {
        animal: 'panda',
      },
    });
  }



  submit() {
    console.log('values to submit', this.asscoiationForm.value);


    const {companyId, playerId}= this.asscoiationForm.value;

    this.authService.associate(companyId,playerId).subscribe({
      next: data => {
        console.log(data.companyId);
        
     
        
      },
      error: err => {
     
      }
    });
  }
  



}
