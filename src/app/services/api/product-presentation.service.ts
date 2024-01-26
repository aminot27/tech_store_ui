import { Inject, Injectable, Optional } from '@angular/core';
import { API_BASE_URL, BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IProductPresentation } from '../../models/product-presentation.model'; 

@Injectable({
  providedIn: 'root'
})
export class ProductPresentationService extends BaseService {

  private PRODUCT_PRESENTATION_FILTER_API = "/api/warehouse/product_presentations/filter/";
  private PRODUCT_PRESENTATION_API = "/api/warehouse/product_presentation/";

  constructor(private _http: HttpClient,
              private _router: Router,
              private _toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) _baseUrl?: string) {
    super(_http, _router, _toaster, _baseUrl);
  }

  getProductPresentations(): Observable<IProductPresentation[]> {
    return super.sendRequest(this.PRODUCT_PRESENTATION_FILTER_API, this.GET);
  }

  addProductPresentation(productPresentation: IProductPresentation): Observable<IProductPresentation> {
    return super.sendRequest(this.PRODUCT_PRESENTATION_API, this.POST, productPresentation);
  }

  deleteProductPresentation(productPresentationId: number): Observable<any> {
    return super.sendRequest(`${this.PRODUCT_PRESENTATION_API}${productPresentationId}/`, this.DELETE);
  }

  updateProductPresentation(productPresentationId: number, productPresentationData: IProductPresentation): Observable<IProductPresentation> {
    return super.sendRequest(this.PRODUCT_PRESENTATION_API, this.PUT, productPresentationData, productPresentationId);
  }
}