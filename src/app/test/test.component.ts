import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';



import { AuthService } from '../_services/auth.service';

import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseBody } from '../models/delete.modals';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{CompanyDto} from '../models/company'
import { Router } from '@angular/router';

export interface DialogData{
  animal: 'panda' | 'unicorn' | 'lion'
}







@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  companyForm!:FormGroup
  isLoggedIn = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,public fb: FormBuilder, private authService: AuthService, private http:HttpClient, private router:Router ) {

    this.companyForm=this.fb.group({
      name:['',Validators.required],
      address:['',Validators.required],
      numberOfEmployees:['',Validators.required],
  
      })
   }
  


  

  onSubmit(): void {
    const { name, address,numberOfEmployees } = this.companyForm.value;
   
    this.authService.change( name, address,numberOfEmployees).subscribe({
      next: data => {
        // console.log(data.shortName);
        this.isLoggedIn = true;
        // this.listData.push(this.companyForm.value);
        this.companyForm.reset();
      
        this.router.navigateByUrl('/superadmin/companylist');
      
        
      },
      error: err => {
     
      }
    });
  }

 


  ngOnInit(): void {
  }

}
