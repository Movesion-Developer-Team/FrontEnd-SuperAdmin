import { Component, OnInit } from '@angular/core';
import { FormGroup,FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { PlayerBodyDto } from '../models/PlayerBodyDto';
import { Observable } from 'rxjs';
import { CreateNewCompanyBodyDto } from '../models/company';
import { Category } from '../models/category';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {


  categoryForm!:FormGroup
  isLoggedIn = false;



  constructor(private fb : FormBuilder ,

     public dialogRef: MatDialogRef<AddcategoryComponent>,
    private authService: AuthService, private http:HttpClient, private router:Router, private dialog: MatDialog, ){ 
   
  this.categoryForm=this.fb.group({
    Name:['',Validators.required],
    Description:['',Validators.required],

    })
  }


  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    if (this.categoryForm){
    const { id,Name, Description } = this.categoryForm.value;
   
    this.authService.CreateNewCategory(Name, Description).subscribe({
      next: data => {
        console.log(data.Name);
        this.isLoggedIn = true;
        
        if (this.categoryForm){
          this.categoryForm.reset();
          setInterval(() => {
         
            this.dialog.closeAll();
          }, 2000);
        }
      },
      error: err => {
     
      }
    });

    }
  }

}
  

 






  


  