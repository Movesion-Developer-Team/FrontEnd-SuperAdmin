import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';

import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseBody } from '../models/delete.modals';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CreateNewCompanyBodyDto} from '../models/company';
import { Router } from '@angular/router';
import { GeneralResponseDto } from '../models/GeneralResponseDto';

import {companyBodyDto} from '../models/companyBodyDto'
import { MatDialog } from '@angular/material/dialog';
import { TestComponent } from '../test/test.component';
import { GetAllCompaniesResponseDto } from '../models/GetAllCompaniesResponseDto';

import{NewcompanyComponent} from '../newcompany/newcompany.component'
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  playerForm!:FormGroup
  searchTerm!: string;
  // countries!: Company[];
  term!: string;
  search : String ="";
  isUpdating = false;
  showForm= true;
  id!:number;

  companyForm!:FormGroup

 listData!:companyBodyDto[];

 collection: any = [];
 page:number = 0;
 isShown: boolean = false ; // hidden by default
 
  // id :number| undefined;
  // isCreated= false;
  isLoggedIn = false;
  // form  = {
  //   name: '',
  //   address: '',
  //   numberOfEmployees: ''
  // };
  //  list:any[]=[];
  //  addTask(item:any){
  //   this.list.push({id:this.list.length,name:item})

  // }


  constructor(private dialog: MatDialog, private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router ) {

    

    this.companyForm=this.fb.group({
    name:['',Validators.required],
    address:['',Validators.required],
    numberOfEmployees:['',Validators.required],
    id:['',Validators.required]

    })
  }


  onClickButton(){
    this.dialog.open(NewcompanyComponent, {
      width: '750px',
      height:'100%',
      data: {
      
      },
    })
     
    
    
  

  }
  
onClick(){
  this.dialog.open(ConfirmDialogComponent, {
        width: '800px',
        height:'900px',
        panelClass: 'custom-modalbox',
        
        data: {
          
          
        },
      })
      
    //   .afterClosed().subscribe(res=>{
    // this.getcompany();
    
    //   });
}


  onRemoveCompany(element:companyBodyDto) {
    //   
  if(confirm('Are you sure you want to remove')){
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
}
    
  reset(){this.companyForm.reset()}



  // this.http.get<GenericResponseDto<companyBodyDto[]>>('https://localhost:7098/Company/GetAll')
  // .pipe(
  //   map(result=> result.companies)
  // )
  //   .subscribe((data: companyBodyDto[]) => {
  //     this.listData = data;
  //   });


   
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

  
  gohere(){this.router.navigateByUrl('./company-list.component.html');
  }
  
  onSubmit(): void {
    const { name, address } = this.companyForm.value;
   
    this.authService.CreateNewCompany( name, address).subscribe({
      next: data => {
        // console.log(data.shortName);
        this.isLoggedIn = true;
        this.listData.push(this.companyForm.value);
        this.companyForm.reset();
       
     
        
      },
      error: err => {
     
      }
    });
  }
  // toggleShow() {

  //   this.isShown = ! this.isShown;
    
  //   }

  // modalContent = false;
  // openSortingModal(){
  //   this.modalContent = true;
    
  // }
  // closeModal(){
  //  this.modalContent = false;
  // }
  // this is for test:
//   salar(){
//     this.http.get<GeneralResponseDto>('https://localhost:7098/Company/FindById')
//     .pipe(
//       map(result=>{
//         return result as GeneralResponseDto;
//       })
//     )
    

//     .subscribe((data: GeneralResponseDto) => {
       
//       this.id=data.unit

//     });
// this.authService.DeleteCompany(this.id).subscribe({
//       next: data => {
       
//        console.log(data.unit)
        
     
        
//       },
//       error: err => {
     
//       }
//     });
//   }

 onClickForm(item: CreateNewCompanyBodyDto){
  this.dialog.open(TestComponent, {
    width: '800px',
    height:'800px',
    panelClass: 'custom-modalbox',
    
    data: {
      companyid:item.id
    },
  })
//   .afterClosed().subscribe(res=>{
// this.getcompany();

//   });
}
    // this.router.navigateByUrl('/superadmin/update')







    
}


