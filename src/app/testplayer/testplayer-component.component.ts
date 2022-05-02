import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Category } from '../models/category';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-testplayer-component',
  templateUrl: './testplayer-component.component.html',
  styleUrls: ['./testplayer-component.component.css']
})
export class TestplayerComponentComponent implements OnInit {
  playerForm!:FormGroup
  listData:any;
  isLoggedIn = false;
  constructor(private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router) { }

  ngOnInit(): void {

    this.http.get<any>('https://localhost:7098/Category/GetAll')
  .pipe(
    map(result=>{
      return result.unit as Category[];
    })
  )

  .subscribe((data: Category[]) => {
    this.listData = data;
  });
  }



  onSubmit(): void {
    // const { shortName,fullName,playStoreLink,appStoreLink,linkDescription,color,categoryId } = this.playerForm.value;
    
    // this.authService.change( shortName,fullName,playStoreLink,appStoreLink,linkDescription,color,categoryId).subscribe({
    //   next: data => {
    //     console.log(data.shortName);
    //     this.isLoggedIn = true;
    //     this.listData.push(this.playerForm.value);
    //     this.playerForm.reset();
    //     this.router.navigateByUrl('/superadmin/playerlist');
     
        
  //     },
  //     // error: err => {
     
  //     }
  //   });
 }
}
