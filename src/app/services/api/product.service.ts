import { Inject, Injectable, Optional } from '@angular/core';
import { API_BASE_URL, BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  private PRODUCT_FILTER_API = "/api/warehouse/products/filter/";
  private PRODUCT_SET_API = "/api/warehouse/product/";

  constructor(private _http: HttpClient,
              private _router: Router,
              private _toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) _baseUrl?: string) {
    super(_http, _router, _toaster, _baseUrl);
  }

  getProducts(): Observable<IProduct[]> {
    return super.sendRequest(this.PRODUCT_FILTER_API, this.GET);
  }

  addProduct(product: IProduct): Observable<IProduct> {
    return super.sendRequest(this.PRODUCT_SET_API, this.POST, product);
  }

  deleteProduct(productId: string): Observable<any> {
    return super.sendRequest(`${this.PRODUCT_SET_API}${productId}`, this.DELETE);
  }

  updateProduct(productId: string, productData: Partial<IProduct>): Observable<IProduct> {
    return super.sendRequest(this.PRODUCT_SET_API, this.PUT, productData, productId);
  }

  getProduct(productId: string): Observable<IProduct> {
    return super.sendRequest(`${this.PRODUCT_SET_API}${productId}/`, this.GET);
  }
}