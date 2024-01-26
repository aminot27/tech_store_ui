import { Inject, Injectable, Optional } from '@angular/core';
import { API_BASE_URL, BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPresentation } from '../../models/presentation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresentationService extends BaseService {

  private PRESENTATION_FILTER_API = "/api/warehouse/presentations/filter/";
  private PRESENTATION_SET_API = "/api/warehouse/presentation/";

  constructor(private _http: HttpClient,
              private _router: Router,
              private _toaster: ToastrService,
              @Optional() @Inject(API_BASE_URL) _baseUrl?: string) {
    super(_http, _router, _toaster, _baseUrl);
  }

  getPresentations(): Observable<IPresentation[]> {
    return super.sendRequest(this.PRESENTATION_FILTER_API, this.GET);
  }

  addPresentation(presentation: IPresentation): Observable<IPresentation> {
    return super.sendRequest(this.PRESENTATION_SET_API, this.POST, presentation);
  }

  deletePresentation(presentationId: number): Observable<any> {
    return super.sendRequest(this.PRESENTATION_SET_API, this.DELETE, presentationId);
  }

  updatePresentation(presentationId: number, presentationData: IPresentation): Observable<IPresentation> {
    return super.sendRequest(this.PRESENTATION_SET_API, this.PUT, presentationData, presentationId);
  }
}