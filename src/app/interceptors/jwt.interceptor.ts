import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from '../services/security/authentication.service';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {serverErrorToasterConfig} from '../constats/toaster.configs';
import {Router} from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthenticationService,
              private _toasterService: ToastrService,
              private _router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authUser: any = this._authService.authUserValue;
    try {
      if (authUser) {
        request = request.clone({setHeaders: {Authorization: `Bearer ${authUser.access}`}});
      }
    } catch (e) {
      this._toasterService.error(e, 'ERROR SETTING HEADERS', serverErrorToasterConfig);
    }
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        switch (errorResponse.status) {
          case 0:
            this._toasterService.error(errorResponse.statusText, 'CONNECTION REFUSED', serverErrorToasterConfig);
            return throwError(errorResponse.statusText);
          case 401:
            this._toasterService.error('Token expired!!!', 'UNAUTHORIZED ACCESS', serverErrorToasterConfig);
            this._router.navigate(['/login']);
            return throwError(errorResponse.message);
          case 400:
            return throwError(errorResponse);
          case 403:
            this._toasterService.error('Unable to access to resource', 'FORBIDDEN ACCESS', serverErrorToasterConfig);
            return throwError(errorResponse.message);
          case 404:
            return throwError(errorResponse);
          case 500:
            this._toasterService.error(errorResponse.url, 'INTERNAL SERVER ERROR', serverErrorToasterConfig);
            return throwError(errorResponse.statusText);
        }
      }));
  }
}
