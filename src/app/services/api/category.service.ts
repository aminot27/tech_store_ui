import { Inject, Injectable, Optional } from '@angular/core';
import { API_BASE_URL, BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from '../../models/category.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  private CATEGORY_FILTER_API = "/api/warehouse/categories/filter/";
  private CATEGORY_SET_API = "/api/warehouse/category/";

  constructor(private _http: HttpClient,
              private _router: Router,
              private _toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) _baseUrl?: string) {
    super(_http, _router, _toaster, _baseUrl);
  }

  getCategories(): Observable<ICategory[]> {
    return super.sendRequest(this.CATEGORY_FILTER_API, this.GET);
  }

  addCategory(category: ICategory): Observable<ICategory> {
    return super.sendRequest(this.CATEGORY_SET_API, this.POST, category);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return super.sendRequest(this.CATEGORY_SET_API, this.DELETE, categoryId);
  }

  updateCategory(categoryId: number, categoryData: ICategory): Observable<ICategory> {
    return super.sendRequest(this.CATEGORY_SET_API, this.PUT, categoryData, categoryId);
  }

  getHighestOrder(): Observable<number> {
    return this.getCategories().pipe(
      map(categories => categories.length > 0 ? Math.max(...categories.map(c => c.order)) : 0)
    );
  }
}