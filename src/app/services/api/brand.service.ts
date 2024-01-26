import { Inject, Injectable, Optional } from '@angular/core';
import { API_BASE_URL, BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from '../../models/brand.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends BaseService {

  private BRAND_FILTER_API = "/api/warehouse/brands/filter/"; 
  private BRAND_SET_API = "/api/warehouse/brand/";

  constructor(private _http: HttpClient,
              private _router: Router,
              private _toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) _baseUrl?: string) {
    super(_http, _router, _toaster, _baseUrl);
  }

  getBrands(): Observable<IBrand[]> {
    return super.sendRequest(this.BRAND_FILTER_API, this.GET);
  }

  addBrand(brand: IBrand): Observable<IBrand> {
    return super.sendRequest(this.BRAND_SET_API, this.POST, brand);
  }

  deleteBrand(brandId: number): Observable<any> {
    return super.sendRequest(this.BRAND_SET_API, this.DELETE, brandId);
  }

  updateBrand(brandId: number, brandData: IBrand): Observable<IBrand> {
    return super.sendRequest(this.BRAND_SET_API, this.PUT, brandData, brandId);
  }
}
