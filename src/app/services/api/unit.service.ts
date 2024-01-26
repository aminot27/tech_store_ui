import {Inject, Injectable, Optional} from '@angular/core';
import {API_BASE_URL, BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {IUnit} from '../../models/unit.model';
import {Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UnitService extends BaseService {

  private UNIT_FILTER_API = "/api/warehouse/units/filter/"
  private UNIT_SET_API = "/api/warehouse/unit/";


  constructor(private _http: HttpClient,
              private _router: Router,
              private _toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) _baseUrl?: string) {
    super(_http, _router, _toaster, _baseUrl);
  }

  getUnits(): Observable<IUnit[]> {
    return super.sendRequest(this.UNIT_FILTER_API, this.GET);
  }

  addUnit(unit: IUnit): Observable<IUnit> {
    return super.sendRequest(this.UNIT_SET_API, this.POST, unit)
  }

  deleteUnit(unitId: number): Observable<any> {
    return super.sendRequest(this.UNIT_SET_API, this.DELETE, unitId)
  }

  updateUnit(unitId: number, unitData: IUnit): Observable<IUnit> {
    return super.sendRequest(this.UNIT_SET_API, this.PUT, unitData, unitId)
  }

  getUnitById(unitId: number): Observable<IUnit> {
    const url = `${this.UNIT_SET_API}${unitId}/`;
    return super.sendRequest(url, this.GET);
  }

}
