import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';

import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseBody } from '../models/delete.modals';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{CompanyDto} from '../models/company'
import { Router } from '@angular/router';






@Component({
  selector: 'app-newcompany',
  templateUrl: './newcompany.component.html',
  styleUrls: ['./newcompany.component.css']
})
export class NewcompanyComponent implements OnInit {
 
  searchTerm!: string;
  companies!: CompanyDto[];
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


  constructor(private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router ) {

    // this.listData=[{
    //   name: '',
    //   address: '',
    //   numberOfEmployees : 0,
    //  }];

    this.companyForm=this.fb.group({
    name:['',Validators.required],
    address:['',Validators.required],
    numberOfEmployees:['',Validators.required],

    })
  }

    // removeItem(element: any){
    //   this.listData.forEach((value: any,index: any)=>{
    //       if(value == element )
    //       this.listData.splice(index,1);
    //   })
    // }
    
    
  reset(){this.companyForm.reset()}






   
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
    const { name, address,numberOfEmployees } = this.companyForm.value;
   
    this.authService.CreateNewCompany( name, address,numberOfEmployees).subscribe({
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

}
  // Create(): void {
  //   const { name, address,numberOfEmployees} = this.form;
  //   console.log(this.form)
  //   this.authService.CreateNewCompany(name, address,numberOfEmployees).subscribe({
  //       next: data => {
  //         console.log(data);
  //         this.isLoggedIn = true;
  //         this.isCreated= true
  //       },
  //     });
  //   }
  //   removeTask(id: BaseBody){
  //     // this.authService.DeleteCompany(id).subscribe({
  //     //       next: data => {
  //     //         console.log(data);    
              
  //     //       },
            
  //     //     });
  //      this.list=this.list.filter(item=>item.id!==id);
  //      }
    


    


  //    Remove(id: number | undefined) {
    
  // if ( id !== undefined){
  //     this.authService.DeleteCompany(id).subscribe({
  //       next:data=>{
  //         console.log(data); 
  //       }
  //     })
  //   }}
  // }
  

