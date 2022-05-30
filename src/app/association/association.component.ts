import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CreateNewCompanyBodyDto } from '../models/company';

import { AuthService } from '../_services/auth.service';
import { AddPlayerTocompanyBodyDto} from '../models/associate';
import { MatDialog } from '@angular/material/dialog';
import { TestComponent } from '../test/test.component';
import { AssociationtestComponent } from '../associationtest/associationtest.component';
import { GetAllPlayerResponseDto,PlayerBodyDto } from '../models/GetAllPlayerResponseDto';
import { CreateNewPlayerBodyDto } from '../models/CreateNewPlayerBodyDto';
import { GetAllCompaniesResponseDto } from '../models/GetAllCompaniesResponseDto';
// import { AddPlayerToCompanyBodyDto } from '../models/AddPlayerToCompanyBodyDto';
// import { createnewplayertocompany } from '../models/AddPlayerToCompanyBodyDto';


@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})
export class AssociationComponent implements OnInit {
  asscoiationForm!:FormGroup;
  
  listPlayer!:PlayerBodyDto[];

  listCompany!:CreateNewCompanyBodyDto[];
  
  isLoggedIn = false;

  term!: string;

  // listData!:AddPlayerToCompanyBodyDto[];
  
  // listaddcompanytoplayer!: associate[];

//  listplayertocompany!:createnewplayertocompany[];

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
  
   this.getPlayer();

   this.getcompany();
   
  //  this.getplayertocompany();

  }



  getPlayer(){
    this.http.get<GetAllPlayerResponseDto>('https://localhost:7098/Player/GetAll').pipe(
      map(res => res.players)
    ).subscribe(res => {
      this.listPlayer = res;
    })
    
  }
  getcompany(){
    this.http.get<GetAllCompaniesResponseDto>('https://localhost:7098/Company/GetAll').pipe(
      map(res => res.companies)
    ).subscribe(res => {
      this.listCompany = res;
    })

  }





  // getplayertocompany (){
  //   this.http.get<AddPlayerToCompanyBodyDto>('https://localhost:7098/Company/GetAllPlayers').pipe(
  //     map(res => res.addplayertocompany)
  //   ).subscribe(res => {
  //     this.listplayertocompany = res;
  //   })
  // }





  modalContent = false;
  openSortingModal(){
    this.modalContent = true;
    
  }
  closeModal(){
   this.modalContent = false;
  }

  // removeItem(element: any ){
      
  //   this.listData.forEach((value: any,index: any)=>{
  //       if(value == element )
  //       this.listData.splice(index,1);
  //   })
   
  // }

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
        console.log(this.asscoiationForm.value)
        
     
        
      },
      error: err => {
     
      }
    });
  }
  



}
