import { Inject, Injectable, Optional } from '@angular/core';
import { API_BASE_URL, BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ISubcategory } from '../../models/subcategory.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService extends BaseService {

  private SUBCATEGORY_FILTER_API = "/api/warehouse/subcategories/filter/";
  private SUBCATEGORY_SET_API = "/api/warehouse/subcategory/";

  constructor(private _http: HttpClient,
              private _router: Router,
              private _toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) _baseUrl?: string) {
    super(_http, _router, _toaster, _baseUrl);
  }

  getSubcategories(): Observable<ISubcategory[]> {
    return super.sendRequest(this.SUBCATEGORY_FILTER_API, this.GET);
  }

  addSubcategory(subcategory: ISubcategory): Observable<ISubcategory> {
    return super.sendRequest(this.SUBCATEGORY_SET_API, this.POST, subcategory);
  }

  deleteSubcategory(subcategoryId: number): Observable<any> {
    return super.sendRequest(this.SUBCATEGORY_SET_API, this.DELETE, subcategoryId);
  }

  updateSubcategory(subcategoryId: number, subcategoryData: ISubcategory): Observable<ISubcategory> {
    return super.sendRequest(this.SUBCATEGORY_SET_API, this.PUT, subcategoryData, subcategoryId);
  }

  getHighestOrder(): Observable<number> {
    return this.getSubcategories().pipe(
      map(categories => categories.length > 0 ? Math.max(...categories.map(c => c.order)) : 0)
    );
  }
}