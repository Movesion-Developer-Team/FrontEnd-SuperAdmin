import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
// import { AddPlayerToCompanyBodyDto, CategoryBodyDto, } from '../models/AddPlayerToCompanyBodyDto';
import { AddPlayerTocompanyBodyDto } from '../models/associate';
import { CreateNewCompanyBodyDto } from '../models/company';
import { companyBodyDto } from '../models/companyBodyDto';
import { companyPlayer } from '../models/companyPlayer';
import { CompanyWithPlayersBodyDto, GetAllCompaniesWithPlayersResponseDto } from '../models/companywithplayer';
import { GetAllCompaniesResponseDto } from '../models/GetAllCompaniesResponseDto';


import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-associationlist',
  templateUrl: './associationlist.component.html',
  styleUrls: ['./associationlist.component.css']
})



export class AssociationlistComponent implements OnInit {
  term!: string;
  listData!:CompanyWithPlayersBodyDto[];
  // listData!:companyBodyDto;
  asscoiationForm!:FormGroup


  listCompany!:CreateNewCompanyBodyDto[];

  page:any;
 id:number| undefined ;

  constructor(private dialog: MatDialog, private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router) { 


    // this.asscoiationForm=this.fb.group({
    //   companyId:['',Validators.required],
    //   playerId:['',Validators.required]
    // });
  }


//inja bayad chandta pipe estefade konam:

  ngOnInit(): void {

    this.http.get<GetAllCompaniesWithPlayersResponseDto>('https://localhost:7098/Company/GetAllCompaniesWithPlayers').pipe(
      map(res => res.companies )
    ).subscribe(res => {
      this.listData=res ;
    })
  
    // this.http.get<GetAllCompaniesResponseDto>('https://localhost:7098/Company/GetAll').pipe(
    //   tap(res =>{this.listCompany= res.companies} ),
    //   switchMap(res =>{
        
    //     return this.http.get<any>('https://localhost:7098/Company/GetAllCompaniesWithPlayers')
    //     .pipe(
    //       map(res=> res.company as companyBodyDto)
    //     );
      
    //   })

    // ).subscribe(companyInfo => {
   
    //   // this.listCompany = res;
    //   this.asscoiationForm=this.fb.group({
    //    companyId:[companyInfo.id,Validators.required],
    //     playerId:[companyInfo.name,Validators.required],
        
    //     })
    // })
    



  }}
