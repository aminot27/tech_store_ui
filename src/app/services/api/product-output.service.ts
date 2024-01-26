import { Inject, Injectable, Optional } from '@angular/core';
import { API_BASE_URL, BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProductOutput } from '../../models/product-output.model'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductOutputService extends BaseService {

  private PRODUCT_OUTPUT_FILTER_API = "/api/warehouse/product_outputs/filter/";
  private PRODUCT_OUTPUT_SET_API = "/api/warehouse/product_output/";

  constructor(private _http: HttpClient,
              private _router: Router,
              private _toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) _baseUrl?: string) {
    super(_http, _router, _toaster, _baseUrl);
  }

  getProductOutputs(): Observable<IProductOutput[]> {
    return super.sendRequest(this.PRODUCT_OUTPUT_FILTER_API, this.GET);
  }

  addProductOutput(productOutput: IProductOutput): Observable<IProductOutput> {
    return super.sendRequest(this.PRODUCT_OUTPUT_SET_API, this.POST, productOutput);
  }

  deleteProductOutput(productOutputId: number): Observable<any> {
    return super.sendRequest(`${this.PRODUCT_OUTPUT_SET_API}${productOutputId}/`, this.DELETE);
  }

  updateProductOutput(productOutputId: number, productOutputData: IProductOutput): Observable<IProductOutput> {
    return super.sendRequest(`${this.PRODUCT_OUTPUT_SET_API}${productOutputId}/`, this.PUT, productOutputData);
  }
}