import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  public product : Product[] = [];
  currentCategoryId: number = 1;
  currentCategoryName: string = "";

  constructor(private productService: ProductService,
              private routes: ActivatedRoute ){}

  ngOnInit(): void {
    this.routes.paramMap.subscribe( () =>{
      this.listProducts();
    })
  }

  listProducts(){

    const hasCategoryId: boolean = this.routes.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.currentCategoryId = +this.routes.snapshot.paramMap.get('id')!;
      this.currentCategoryName = this.routes.snapshot.paramMap.get('name')!;
    } else {
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Book';
    }

    this.getProducts()
  }

  getProducts(){
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => { this.product = data }
    );
  }

}
