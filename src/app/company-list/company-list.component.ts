import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';

import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseBody } from '../models/delete.modals';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{CompanyDto, GenericResponseDto} from '../models/company'
import { Router } from '@angular/router';
import { GeneralResponseDto } from '../models/GeneralResponseDto';


import { MatDialog } from '@angular/material/dialog';
import { TestComponent } from '../test/test.component';

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
 
  isUpdating = false;
  showForm= true;
    id!:number;

  companyForm!:FormGroup

 listData:CompanyDto[];

 collection: any = [];
 page: any;
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

    this.listData=[];

    this.companyForm=this.fb.group({
    name:['',Validators.required],
    address:['',Validators.required],
    numberOfEmployees:['',Validators.required],
    id:['',Validators.required]

    })
  }


  



    removeItem(element: CompanyDto ){
      
      this.listData.forEach((value: any,index: any)=>{
          if(value == element )
          this.listData.splice(index,1);
      })
     
    }
  
      
    remove(id:number){
      
      this.authService.DeleteCompany(id).subscribe({
      next: data => {
       
       console.log(data)
        
     
        
      },
      error: err => {
     
      }
    });
  }
    
    
  reset(){this.companyForm.reset()}






   
  ngOnInit(): void {
    this.http.get<GenericResponseDto<CompanyDto[]>>('https://localhost:7098/Company/GetAll')
    .pipe(
      map(result => result.unit)
    )

    .subscribe((data: CompanyDto[]) => {
      this.listData = data;
    });
  }

  gohere(){this.router.navigateByUrl('./company-list.component.html');
  }
  
  onSubmit(): void {
    const { name, address,numberOfEmployees } = this.companyForm.value;
   
    this.authService.CreateNewCompany( name, address,numberOfEmployees).subscribe({
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
  salar(){
    this.http.get<GeneralResponseDto>('https://localhost:7098/Company/FindById')
    .pipe(
      map(result=>{
        return result as GeneralResponseDto;
      })
    )
    

    .subscribe((data: GeneralResponseDto) => {
       
      this.id=data.unit

    });
this.authService.DeleteCompany(this.id).subscribe({
      next: data => {
       
       console.log(data.unit)
        
     
        
      },
      error: err => {
     
      }
    });
  }

 onClickForm(item: CompanyDto){
  this.dialog.open(TestComponent, {
    width: '600px',
    height:'600px',
    data: {
      animal: 'panda',
    },
  });
}
    // this.router.navigateByUrl('/superadmin/update')
}

