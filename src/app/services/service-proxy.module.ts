import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {environment} from '../../environments/environment';
import * as SecurityService from './security/security.service';


@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    SecurityService.SecurityService,

    {
      provide: SecurityService.SECURITY_API_BASE_URL,
      useValue: environment.host,
    },
  ],
})
export class ServiceProxyModule {
}
