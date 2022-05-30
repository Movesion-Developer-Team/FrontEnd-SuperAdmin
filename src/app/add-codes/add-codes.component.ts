import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CreateNewPlayerBodyDto } from '../models/CreateNewPlayerBodyDto';
import { companyBodyDto, GetAllCompaniesResponseDto } from '../models/GetAllCompaniesResponseDto';
import { GetAllPlayersForCurrentCompanyResponseDto, players } from '../models/GetAllPlayersForCurrentCompanyResponseDto';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-add-codes',
  templateUrl: './add-codes.component.html',
  styleUrls: ['./add-codes.component.css']
})
export class AddCodesComponent implements OnInit {
  listData!:companyBodyDto[];


  selected=false;
  GetAllPlayersForOneCompanyList!:players[];




  constructor(private dialog: MatDialog, private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router ) { }





  ngOnInit(): void {

this.getcompany();
  }




  getcompany (){
    this.http.get<GetAllCompaniesResponseDto>('https://localhost:7098/Company/GetAll').pipe(
      map(res => res.companies)
    ).subscribe(res => {
      this.listData = res;
    })
    
  }









  onClickForm(item:companyBodyDto){
   
       var companyId = item.id
      console.log()
      this.http.get<GetAllPlayersForCurrentCompanyResponseDto> ('https://localhost:7098/Company/GetAllPlayersForOneCompany?companyId='+item.id ).pipe(
        map(res => res.players)
      ).subscribe(res => {
       this.GetAllPlayersForOneCompanyList = res
      //  this.isSubmi
      console.log(this.GetAllPlayersForOneCompanyList)
        // this.router.navigate(['superadmin/Codes']
        this.selected=true
        
      }
         
      );


  }
}
