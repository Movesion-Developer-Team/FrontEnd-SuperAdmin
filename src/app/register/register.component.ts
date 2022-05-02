import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form  = {
    UserName: '',
    Password: '',
    CompanyId : 0
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
    private http:HttpClient,
    private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { UserName,CompanyId,Password } = this.form;
    console.log(this.form)
    this.authService.Register(UserName,Password,CompanyId).subscribe({
      next: data => {
        console.log(data.companyId);
        
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}



