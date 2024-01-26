import { Inject, Injectable, Optional } from '@angular/core';
import { API_BASE_URL, BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IProductSubcategory } from '../../models/product-subcategory.model'; 

@Injectable({
  providedIn: 'root'
})
export class ProductSubcategoryService extends BaseService {

  private PRODUCT_SUBCATEGORY_FILTER_API = "/api/warehouse/product_subcategories/filter/";
  private PRODUCT_SUBCATEGORY_API = "/api/warehouse/product_subcategory/";

  constructor(private _http: HttpClient,
              private _router: Router,
              private _toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) _baseUrl?: string) {
    super(_http, _router, _toaster, _baseUrl);
  }

  getProductSubcategories(): Observable<IProductSubcategory[]> {
    return super.sendRequest(this.PRODUCT_SUBCATEGORY_FILTER_API, this.GET);
  }

  addProductSubcategory(productSubcategory: IProductSubcategory): Observable<IProductSubcategory> {
    return super.sendRequest(this.PRODUCT_SUBCATEGORY_API, this.POST, productSubcategory);
  }

  deleteProductSubcategory(productSubcategoryId: number): Observable<any> {
    return super.sendRequest(`${this.PRODUCT_SUBCATEGORY_API}${productSubcategoryId}/`, this.DELETE);
  }

  updateProductSubcategory(productSubcategoryId: number, productSubcategoryData: IProductSubcategory): Observable<IProductSubcategory> {
    return super.sendRequest(this.PRODUCT_SUBCATEGORY_API, this.PUT, productSubcategoryData, productSubcategoryId);
  }

}