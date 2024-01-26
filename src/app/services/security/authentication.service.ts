import {Inject, Injectable, Optional} from '@angular/core';
import {BaseService} from '../api/base.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {SECURITY_API_BASE_URL} from './security.service';
import {ToastrService} from 'ngx-toastr';
import {AuthUserModel} from '../../models/security-models/auth-user.model';
import {UserRolModel} from '../../models/security-models/user-rol.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  /**
   * constants
   * */
  private AUTH_API = '/api/authentication/';
  private AUTHORIZATION_API = '/api/master/authorization/';
  private AUTH_VERIFY_API = '/api/auth_user/verify/';

  /**
   * Reset password
   * */
  private RESET_PASSWORD = '/api/master/users/reset/password/';
  private VERIFY_USER = '/api/master/users/verify/';

  /**
   * Authenticate variables
   * */

  private authUserSubject: BehaviorSubject<AuthUserModel>;
  //public authUser$: Observable<AuthUserModel>;
  /**
   * Authenticated user information
   * **/
  private userRolesSubject: BehaviorSubject<UserRolModel[]>;

  //public authorizedProfiles$: Observable<UserRolModel[]>;
  private isRegisteredSubject: BehaviorSubject<boolean>;
  public isRegistered$: Observable<boolean>;

  private unregisterIdPersoneroSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  unregisterIdPersonero$ = this.unregisterIdPersoneroSubject.asObservable();

  constructor(protected _http: HttpClient,
              protected _router: Router,
              protected _toasterService: ToastrService,
              @Optional() @Inject(SECURITY_API_BASE_URL) _baseUrl?: string) {
    super(_http, _router, _toasterService, _baseUrl);
    const stored_auth_user = localStorage.getItem('authUser');
    const stored_roles = localStorage.getItem('roles');
    this.authUserSubject = new BehaviorSubject<AuthUserModel>(stored_auth_user !== undefined ? JSON.parse(stored_auth_user) : {});
    //this.authUser$ = this.authUserSubject.asObservable();
    this.userRolesSubject = new BehaviorSubject<UserRolModel[]>(stored_roles !== undefined ? JSON.parse(stored_roles) : []);
    //this.authorizedProfiles$ = this.userRolesSubject.asObservable();
    this.isRegisteredSubject = new BehaviorSubject<boolean>(false);
    this.isRegistered$ = this.isRegisteredSubject.asObservable();

  }

  public get authUserValue(): AuthUserModel {
    return this.authUserSubject.value;
  }

  public get userRoleValues(): UserRolModel[] {
    return this.userRolesSubject.value;
  }

  public authenticate(username: string, password: string): void {
    super.sendRequest<any>(this.AUTH_API, this.POST, {username, password})
      .subscribe((data) => {
        const authUser = new AuthUserModel(data);
        if (authUser) {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.authUserSubject.next(authUser);
          this.authorize();
        }
      });
  }

  public authorize(): void {
    super.sendRequest<any>(this.AUTHORIZATION_API, this.GET)
      .subscribe((data) => {
          const userRoles = data instanceof Array ? data.map(rol => new UserRolModel(rol)) : [];
          if (userRoles.length !== 0) {
            localStorage.setItem('roles', JSON.stringify(userRoles));
            this.userRolesSubject.next(userRoles);
            this._router.navigate(['/pages/inscriptions/candidates']);
          } else {
            this._router.navigate(['/404']);
          }
        }
      );
  }

  verifyAuthUser(username: string): void {
    super.sendRequest(this.AUTH_VERIFY_API, this.GET, username)
      .subscribe((data: any) => {
        if (!data?.is_registered) {
          this.unregisterIdPersoneroSubject.next(username);
          this._router.navigate(['/register']);
        } else {
          this.isRegisteredSubject.next(data?.is_registered);
        }
      })
  }

  clearAuthStorage() {
    localStorage.removeItem('authUser');
    localStorage.removeItem('roles');
    this.authUserSubject.next(null);
    this.userRolesSubject.next([]);
  }

  logout() {
    this.clearAuthStorage();
    this._router.navigate(['/login']);
  }

}
