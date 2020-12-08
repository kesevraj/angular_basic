import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductapiService {
  // headers = new HttpHeaders().set('Content-Type', 'application/json'); 
  constructor(private http: HttpClient) {
  

   }
   fetchproduct(){
     return this.http.get("http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl&product_type=lipstick")
  }

  private product:any = undefined;

  setData(data:any){
      this.product = data;
  }

  getData():any{
      return this.product;
  }
}
