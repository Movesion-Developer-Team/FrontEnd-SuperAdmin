import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { associate } from '../models/associate';
import { CreateNewCompanyBodyDto } from '../models/company';
import { PlayerBodyDto } from '../models/PlayerBodyDto';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-associationtest',
  templateUrl: './associationtest.component.html',
  styleUrls: ['./associationtest.component.css']
})
export class AssociationtestComponent implements OnInit {
  listData!:associate[];

  listPlayer:PlayerBodyDto[] = [];
  listCompany:CreateNewCompanyBodyDto[] = [];
  isLoggedIn = false;
  asscoiationForm!:FormGroup;
  constructor(private dialog:MatDialog, private fb : FormBuilder,private authService: AuthService, private http:HttpClient, private router:Router ) { }

  ngOnInit(): void {


    
    this.http.get<any>('https://localhost:7098/Player/GetAll')
    .pipe(
      map(result=>{
        return result.unit as PlayerBodyDto[];
      })
    )
      .subscribe((data: PlayerBodyDto[]) => {
        this.listPlayer = data;
      });
     


      this.http.get<any>('https://localhost:7098/Company/GetAll')
      .pipe(
        map(result=>{
          return result.unit as CreateNewCompanyBodyDto[];
        })
      )
      .subscribe((data: CreateNewCompanyBodyDto[]) => {
        this.listCompany = data;
      });


      this.http.get<associate[]>('https://localhost:7098/Company/GetAll')
      .pipe(
        map(result => result)
      )
  
      .subscribe((data: associate[]) => {
        this.listData = data;
      });
  }
  submit() {
    console.log('values to submit', this.asscoiationForm.value);


    const {companyId, playerId}= this.asscoiationForm.value;

    this.authService.associate(companyId,playerId).subscribe({
      next: data => {
        // console.log(data.companyId);
        
     
        
      },
      error: err => {
     
      }
    });
  }

}
