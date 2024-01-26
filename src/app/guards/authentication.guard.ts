import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "../services/security/authentication.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.authUserValue;
    const authorizedProfiles = this.authenticationService.userRoleValues;
    if (currentUser && authorizedProfiles) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
