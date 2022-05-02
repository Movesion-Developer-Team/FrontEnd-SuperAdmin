import { Component, OnInit } from '@angular/core';
import { FormGroup,FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/Player';
import { Observable } from 'rxjs';
import { CompanyDto } from '../models/company';
import { Category } from '../models/category';



@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {


  categoryForm!:FormGroup
  isLoggedIn = false;



  constructor(private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router ){ 
   
  this.categoryForm=this.fb.group({
    Name:['',Validators.required],
    Description:['',Validators.required],

    })
  }


  ngOnInit(): void {
  }
   
  onSubmit(): void {
    const { Name, Description } = this.categoryForm.value;
   
    this.authService.CreateNewCategory(Name, Description).subscribe({
      next: data => {
        console.log(data.Name);
        this.isLoggedIn = true;
        
        this.categoryForm.reset();
       
        this.router.navigateByUrl('/superadmin/category');
        
      },
      error: err => {
     
      }
    });

    
  }

}
  

 






  


  