import {Injectable, InjectionToken} from '@angular/core';

export const SECURITY_API_BASE_URL = new InjectionToken<string>('SECURITY_API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() {
  }
}
