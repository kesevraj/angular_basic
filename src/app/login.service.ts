import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
isauth:boolean=false

checkauth(){
this.isauth= true
}

}
