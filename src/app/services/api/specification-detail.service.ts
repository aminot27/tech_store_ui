import { Inject, Injectable, Optional } from '@angular/core';
import { API_BASE_URL, BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ISpecificationDetail } from '../../models/specification-detail.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecificationDetailService extends BaseService {

  private SPECIFICATION_DETAIL_FILTER_API = "/api/warehouse/specification_details/filter/";
  private SPECIFICATION_DETAIL_SET_API = "/api/warehouse/specification_detail/";

  constructor(http: HttpClient,
              router: Router,
              toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    super(http, router, toaster, baseUrl);
  }

  getSpecificationDetails(): Observable<ISpecificationDetail[]> {
    return super.sendRequest(this.SPECIFICATION_DETAIL_FILTER_API, this.GET);
  }

  addSpecificationDetail(specificationDetail: ISpecificationDetail): Observable<ISpecificationDetail> {
    return super.sendRequest(this.SPECIFICATION_DETAIL_SET_API, this.POST, specificationDetail);
  }

  deleteSpecificationDetail(specificationDetailId: number): Observable<any> {
    return super.sendRequest(`${this.SPECIFICATION_DETAIL_SET_API}${specificationDetailId}/`, this.DELETE);
  }

  updateSpecificationDetail(specificationDetailId: number, specificationDetailData: ISpecificationDetail): Observable<ISpecificationDetail> {
    return super.sendRequest(this.SPECIFICATION_DETAIL_SET_API, this.PUT, specificationDetailData, specificationDetailId);
  }
}