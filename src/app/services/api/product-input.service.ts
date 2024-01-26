import { Inject, Injectable, Optional } from '@angular/core';
import { API_BASE_URL, BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProductInput } from '../../models/product-input.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductInputService extends BaseService {

  private PRODUCT_INPUT_FILTER_API = "/api/warehouse/product_inputs/filter/";
  private PRODUCT_INPUT_SET_API = "/api/warehouse/product_input/";

  constructor(http: HttpClient,
              router: Router,
              toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    super(http, router, toaster, baseUrl);
  }

  getProductInputs(): Observable<IProductInput[]> {
    return super.sendRequest(this.PRODUCT_INPUT_FILTER_API, this.GET);
  }

  addProductInput(productInput: IProductInput): Observable<IProductInput> {
    return super.sendRequest(this.PRODUCT_INPUT_SET_API, this.POST, productInput);
  }

  deleteProductInput(productInputId: number): Observable<any> {
    return super.sendRequest(`${this.PRODUCT_INPUT_SET_API}${productInputId}/`, this.DELETE);
  }

  updateProductInput(productInputId: number, productInputData: IProductInput): Observable<IProductInput> {
    return super.sendRequest(`${this.PRODUCT_INPUT_SET_API}${productInputId}/`, this.PUT, productInputData);
  }
}