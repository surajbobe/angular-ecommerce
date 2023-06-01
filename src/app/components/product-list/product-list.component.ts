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
              private route: ActivatedRoute ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe( () =>{
      this.listProducts();
    })
  }

  listProducts(){

    const searchMode: boolean = this.route.snapshot.paramMap.has('keyword');

    if(searchMode){
      this.handleSearchProduct();
    } else {
      this.handleListProducts();
    }
    
  }

  handleListProducts(){

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    } else {
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Book';
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => { this.product = data }
    );
  }

  handleSearchProduct(){

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.product = data
      }
    )
  }

}
