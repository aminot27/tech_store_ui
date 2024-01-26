import { Inject, Injectable, Optional } from '@angular/core';
import { API_BASE_URL, BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ISpecification } from '../../models/specification.model'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecificationService extends BaseService {

  private SPECIFICATION_FILTER_API = "/api/warehouse/specifications/filter/";
  private SPECIFICATION_SET_API = "/api/warehouse/specification/";

  constructor(http: HttpClient,
              router: Router,
              toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    super(http, router, toaster, baseUrl);
  }

  getSpecifications(): Observable<ISpecification[]> {
    return super.sendRequest(this.SPECIFICATION_FILTER_API, this.GET);
  }

  addSpecification(specification: ISpecification): Observable<ISpecification> {
    return super.sendRequest(this.SPECIFICATION_SET_API, this.POST, specification);
  }

  deleteSpecification(specificationId: number): Observable<any> {
    return super.sendRequest(`${this.SPECIFICATION_SET_API}${specificationId}/`, this.DELETE);
  }

  updateSpecification(specificationId: number, specificationData: ISpecification): Observable<ISpecification> {
    return super.sendRequest(this.SPECIFICATION_SET_API, this.PUT, specificationData, specificationId);
  }
}