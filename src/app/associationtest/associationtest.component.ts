import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { associate } from '../models/associate';
import { CompanyDto, GenericResponseDto } from '../models/company';
import { Player } from '../models/Player';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-associationtest',
  templateUrl: './associationtest.component.html',
  styleUrls: ['./associationtest.component.css']
})
export class AssociationtestComponent implements OnInit {
  listData!:associate[];

  listPlayer:Player[] = [];
  listCompany:CompanyDto[] = [];
  isLoggedIn = false;
  asscoiationForm!:FormGroup;
  constructor(private dialog:MatDialog, private fb : FormBuilder,private authService: AuthService, private http:HttpClient, private router:Router ) { }

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
