import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/security/authentication.service";

import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<any> = new Subject<any>();
  loginForm: FormGroup;
  isRegistered: boolean = false;

  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthenticationService) {
    this.loginForm = this._formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  login(): void {
    const loginValues = this.loginForm.getRawValue();
    this._authService.authenticate(loginValues.username, loginValues.password);
  }



  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this._authService.clearAuthStorage();
    this._authService.isRegistered$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isRegistered => {
        this.isRegistered = isRegistered;
      })
  }
}
