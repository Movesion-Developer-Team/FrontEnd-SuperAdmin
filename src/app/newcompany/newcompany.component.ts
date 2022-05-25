import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';

import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseBody } from '../models/delete.modals';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{CreateNewCompanyBodyDto} from '../models/company'
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';






@Component({
  selector: 'app-newcompany',
  templateUrl: './newcompany.component.html',
  styleUrls: ['./newcompany.component.css']
})
export class NewcompanyComponent implements OnInit {
 
  searchTerm!: string;
  companies!: CreateNewCompanyBodyDto[];
  term!: string;

  

  isUpdating = false;
 
  companyForm!:FormGroup

 


 
 
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


  constructor(private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router,
    
    public dialogRef: MatDialogRef<NewcompanyComponent>,
    
    private dialog: MatDialog, ) {

    // this.listData=[{
    //   name: '',
    //   address: '',
    //   numberOfEmployees : 0,
    //  }];

    this.companyForm=this.fb.group({
    name:['',Validators.required],
    address:['',Validators.required],
    // numberOfEmployees:['',Validators.required],

    })
  }

    // removeItem(element: any){
    //   this.listData.forEach((value: any,index: any)=>{
    //       if(value == element )
    //       this.listData.splice(index,1);
    //   })
    // }
    
    
  reset(){this.companyForm.reset()}

  onNoClick(): void {
    this.dialogRef.close();
  }
  border() {
    //you can do whatever you want, pass in value, or variables
    return {
       border: '2px ',
       backgroundColor:'',
       display: 'block',
       }
    }



   
  ngOnInit(): void {
    // this.http.get<any>('https://localhost:7098/Company/GetAll')
    // .pipe(
    //   map(result=>{
    //     return result.unit as CompanyDto[];
    //   })
    // )

    // .subscribe((data: CompanyDto[]) => {
    //   // this.listData = data;
    // });
  }

  // gohere(){this.router.navigateByUrl('./company-list.component.html');
  // }
  
  onSubmit(): void {
    if (this.companyForm){
    const { name, address} = this.companyForm.value;
   
    this.authService.CreateNewCompany( name, address).subscribe({
      next: data => {
        // console.log(data.shortName);
        this.isLoggedIn = true;
        if (this.companyForm){
          this.companyForm.reset();
          setInterval(() => {
         
            this.dialog.closeAll();
          }, 2000);
        }
        
      
       
        this.router.navigateByUrl('/superadmin/companylist');
        
      },
      error: err => {
     
      }
    });
  }
}
}

  

