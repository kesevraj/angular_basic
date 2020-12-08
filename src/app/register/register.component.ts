import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { AuthService } from '../auth.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(  public authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

username=""
email=""
password=""


 //getting values from form
 registerform = new FormGroup({
  username: new FormControl('',[Validators.required]),
  email: new FormControl('',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]),
  password: new FormControl('', [
    Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')
   ]),
});



submitform(){
  console.log(this.registerform.value.email)
  console.log(this.registerform.value)
  this.authService.register(this.registerform.value.email,this.registerform.value)
  .subscribe(
    (data:any)=>{
    if(data.mess=="inserted data in data base"){
     alert("inserted")
     this.router.navigate(['/login']);
    }
    else  alert(data.mess);
    // console.log(data)
  }, error => {
      console.log(error);
  }
  )

 

}

}
