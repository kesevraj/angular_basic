import { Component, OnInit } from '@angular/core';
import { ProductapiService } from "../productapi.service"
@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css']
})
export class SingleproductComponent implements OnInit {

  constructor(private productapi:ProductapiService) { }
  product:any =[];
  singleproduct(){
    this.product=this.productapi.getData()
  }
  ngOnInit(): void {
this.singleproduct()
  }

}
