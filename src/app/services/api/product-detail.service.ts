import { Inject, Injectable, Optional } from '@angular/core';
import { API_BASE_URL, BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProductDetail } from '../../models/product-detail.model'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService extends BaseService {

  private PRODUCT_DETAIL_FILTER_API = "/api/warehouse/product_details/filter/";
  private PRODUCT_DETAIL_SET_API = "/api/warehouse/product_detail/";

  constructor(private _http: HttpClient,
              private _router: Router,
              private _toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) _baseUrl?: string) {
    super(_http, _router, _toaster, _baseUrl);
  }

  getProductDetails(): Observable<IProductDetail[]> {
    return super.sendRequest(this.PRODUCT_DETAIL_FILTER_API, this.GET);
  }

  addProductDetail(productDetail: IProductDetail): Observable<IProductDetail> {
    return super.sendRequest(this.PRODUCT_DETAIL_SET_API, this.POST, productDetail);
  }

  deleteProductDetail(productDetailId: number): Observable<any> {
    return super.sendRequest(`${this.PRODUCT_DETAIL_SET_API}${productDetailId}/`, this.DELETE);
  }

  updateProductDetail(productDetailId: number, productDetailData: IProductDetail): Observable<IProductDetail> {
    return super.sendRequest(this.PRODUCT_DETAIL_SET_API, this.PUT, productDetailData, productDetailId);
  }
}