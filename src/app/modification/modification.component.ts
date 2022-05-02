import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css']
})
export class ModificationComponent implements OnInit {
  isCreated= false;
  isLoggedIn = false;
  form  = {
    name: '',
    address: '',
    numberOfEmployees: ''
  };
   list:any[]=[];

   rows:any = []
  constructor() { }

  ngOnInit(): void {
    this.rows = [{
      name:'',
      email:'',
      mobno:''
}]
}
addRow() {
let row = {name: "", email: "",mobno:""};
this.rows.push(row);
}
deleteRow(index:any) {
this.rows.splice(index, 1);
}
submit(){
console.log(this.rows)
}
  }


