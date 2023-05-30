import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = "http://localhost:8080/api/products";
  constructor(private httpClient: HttpClient) { }

  getProductList() : Observable<Product[]>{
    return this.httpClient.get<GetResponseProduct>(this.baseUrl).pipe(
      map( response => response._embedded.products)
    );
  }
}

interface GetResponseProduct{
  _embedded : {
    products : Product []
  }
}
