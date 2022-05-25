import { Component, Inject, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';

import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseBody } from '../models/delete.modals';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CreateNewCompanyBodyDto} from '../models/company';
import { Router } from '@angular/router';
import { GeneralResponseDto } from '../models/GeneralResponseDto';

import {companyBodyDto} from '../models/companyBodyDto'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestComponent } from '../test/test.component';
import { GetAllCompaniesResponseDto } from '../models/GetAllCompaniesResponseDto';

import{NewcompanyComponent} from '../newcompany/newcompany.component'

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;
  playerForm!:FormGroup
  searchTerm!: string;
element!:companyBodyDto[];
  term!: string;
  search : String ="";
  isUpdating = false;
  showForm= true;
    id!:number;
  companyForm!:FormGroup

 listData!:companyBodyDto[];

 collection: any = [];
 page:number = 0;
 isShown: boolean = false ; 

  isLoggedIn = false;
  
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel,private dialog: MatDialog, private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    
  }

  ngOnInit() {
  }

  onConfirm() {
  // this.removeItem();
    this.dialogRef.close(true);
   
}
  
removeItem(element:companyBodyDto) {
  //   

    this.listData.forEach((value: any,index: any)=>{
        if(value == element )
        this.listData.splice(index,1);
    })
    // alert('Are you sure you want to delete this company?')
    
    
   
  

    
  this.authService.DeleteCompany(element.id).pipe(
      catchError(er=> {
        alert('there is an error');
        return of (null);
      })
    )
    .subscribe({
      next: data => {
        // console.log(data.shortName);
        this.isLoggedIn = true;
        this.listData.push(this.companyForm.value);
        this.companyForm.reset();
        
     
        
      },
      error: err => {
     alert(err);
      }
    });

}







  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {

  constructor(public title: string, public message: string,public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel,private dialog: MatDialog, private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router) {
  }
}
