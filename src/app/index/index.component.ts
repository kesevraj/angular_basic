import { Component, OnInit , EventEmitter, Output} from '@angular/core';
import { ProductapiService } from "../productapi.service"
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
 
  products: any = [];
 
  headers: HttpHeaders = new HttpHeaders({
    Authorization: this.authService.getAccessToken()
});

  constructor(private router: Router,private productapi:ProductapiService,private http:HttpClient, public authService: AuthService,
    private activatedRoute: ActivatedRoute) { 
this.userverification()

  }

  userverification(){
    this.http.get("http://localhost:5000/userverify",{ headers: this.headers }).subscribe((response:any)=>
{
  if(response.message=="session expired"){
    alert("session expired you are redirected to login page")
    this.router.navigate(['/login'])
  }

  else{
    console.log("login succesful")
  }
}
)
  }


  getproduct(){
 this.productapi.fetchproduct().subscribe(
  response => {this.products = response
  console.log(this.products)
  });
  

  }

  selectProduct(id:number) {
    const selectedProduct = this.products.find(product  => product.id === id)
    console.log(selectedProduct)
    this.productapi.setData(selectedProduct)
    this.router.navigate(['/singleproduct']);
 }

  ngOnInit(): void {
this.getproduct()
}

}
