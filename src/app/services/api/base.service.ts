import {Inject, Injectable, InjectionToken, Optional} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse, HttpResponseBase} from '@angular/common/http';
import {mergeMap as _observableMergeMap, tap} from 'rxjs/operators';
import {catchError as _observableCatch} from 'rxjs/internal/operators/catchError';
import {throwError as _observableThrow} from 'rxjs/internal/observable/throwError';
import {BehaviorSubject, Observable, of as _observableOf, Subject} from 'rxjs';
// @ts-ignore
import _ = require('lodash');
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {badRequestToasterConfig, serverErrorToasterConfig, successToasterConfig} from '../../constats/toaster.configs';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class BaseService {
  protected http: HttpClient;
  protected router: Router;
  protected baseUrl: string;
  protected toaster: ToastrService;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
  protected POST = 'POST';
  protected GET = 'GET';
  protected PUT = 'PUT';
  protected DELETE = 'DELETE';

  protected showBaseNotifySubject$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public onShowBaseNotify$: Observable<any> = new Observable<any>();

  constructor(@Inject(HttpClient) _http: HttpClient,
              @Inject(Router) _router: Router,
              @Inject(ToastrService) _toaster: any,
              @Optional() @Inject(API_BASE_URL) _baseUrl?: string) {
    this.http = _http;
    this.router = _router;
    this.baseUrl = _baseUrl ? _baseUrl : '';
    this.toaster = _toaster;
  }

  // django pattern only
  public sendRequest<T>(_endPoint: string, _method: string, _viewModel?: any | undefined, _id?: any | undefined): Observable<T> {
    let url = this.baseUrl + _endPoint;
    url = url.replace(/[?&]$/, '');
    const options: any = {
      body: _viewModel,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    /**
     * code to validate GET, PUT DELETE only for Django
     * */
    if (
      (_method === this.DELETE && Number.isInteger(parseInt(_viewModel)) ||
        (_method === this.GET && _viewModel) ||
        (_method === this.PUT && Number.isInteger(_viewModel)))) {
      url = url + _viewModel;
    }
    if (_method === this.PUT && !Number.isInteger(_viewModel)) {
      url = url + _id;
      url += '/';
    }
    /**
     * finish block code
     * */

    return this.http.request(_method, url, options)
      .pipe(_observableMergeMap((response: any) => {
        return this.processResponse<T>(response, _method);
      }))
      .pipe(_observableCatch((response: any) => {
          if (response instanceof HttpResponseBase) {
            try {
              return this.processResponse<T>(response as any, _method);
            } catch (e) {
              return (_observableThrow(e) as any) as Observable<T>;
            }
          } else {
            return (_observableThrow(response) as any) as Observable<T>;
          }
        }),
      );
  }

  protected processResponse<T>(response: HttpResponseBase, method: string): Observable<T> {
    const statusCode = response.status;
    const responseBlob = response instanceof HttpResponse ? response.body : (response as any).error instanceof Blob ? (response as any).error : undefined;
    const _headers: any = {};
    if (response.headers) {
      for (const key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
      if (_headers['content-type'] && _headers['content-type'] !== 'application/json') {
        this.toaster.error(response.url, 'INVALID CONTENT-TYPE RESPONSE HEADER', serverErrorToasterConfig);
        return throwException('The content-type response header is not json/application', statusCode, '', _headers);
      }
    }

    return blobToText(responseBlob)
      .pipe(_observableMergeMap(_responseText => {
          if (!(/^[\],:{}\s]*$/.test(_responseText
            .replace(/\\["\\\/bfnrtu]/g, '@')
            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
            .replace(/(?:^|:|,)(?:\s*\[)+/g, '')))) {
            if (statusCode === 404) {
              this.toaster.error(response.url, 'URL NOT FOUND', badRequestToasterConfig);
            }
            return throwException('The response text is not valid JSON format', statusCode, _responseText, _headers);
          } else {
            const resultData = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
            // if (!resultData.data) {
            //   this.toaster.error('Not found data in response result', 'OOPS!!!', serverErrorToasterConfig);
            //   return throwException('Not found data in response result', statusCode, resultData, _headers)
            // }
            if (resultData?.status && resultData?.data) {
              if (method !== this.GET) {
                this.toaster.success(resultData.message, 'SUCCESS!!!', successToasterConfig);
              }
              return _observableOf<T>(resultData.data);
            } else {
              switch (statusCode) {
                case 200:
                  this.toaster.error(resultData.message, 'OOPS!!!', successToasterConfig);
                  return throwException(resultData.message, statusCode, '', _headers);
                case 400:
                  if (!resultData.details) this.toaster.error(resultData.message, 'EXPECTED BAD REQUEST', badRequestToasterConfig);
                  const details = resultData.details;
                  if (Array.isArray(details)) {
                    details.forEach(detail => {
                      this.toaster.error(detail, resultData.message, badRequestToasterConfig);
                    })
                  }
                  if (typeof details === 'object' && details !== null && !Array.isArray(details)) {
                    for (const key of Object.keys(details)) {
                      const value = details[key];
                      this.toaster.error(key + ': ' + value[0], resultData.message, badRequestToasterConfig);
                    }
                  }
                  //return _observableOf<T>(resultData);
                  return throwException(resultData.message, statusCode, '', _headers);
                case 404:
                  this.toaster.error(resultData.details, resultData.message);
                  return throwException(resultData.message, statusCode, '', _headers);
                default:
                  return throwException('An unexpected server error occurred.', statusCode, '', _headers);
              }
            }
          }
        }),
      );
  }
}

export class ApiException extends Error {
  // message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(message: string, status: number, response: string, headers: { [key: string]: any }, result: any) {
    super();
    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any }, result?: any): Observable<any> {
  if (result !== null && result !== undefined) {
    return _observableThrow(result);
  } else {
    return _observableThrow(new ApiException(message, status, response, headers, null));
  }
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next('');
      observer.complete();
    } else {
      const reader = new FileReader();
      reader.onload = event => {
        observer.next((event.target as any).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}
