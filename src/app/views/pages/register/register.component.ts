import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/security/authentication.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup
  @Input()

  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private _formBuilder: FormBuilder,
              private _router: Router,
              private _authenticationService: AuthenticationService) {

  }

  register(): void {
  }

  isInvalidPassword(): boolean {
    const password = this.registerForm.controls['password'];
    const confirm = this.registerForm.controls['passwordRep'];
    return (password?.valid && password?.value) !== confirm?.value;

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
    this.registerForm.reset();
  }

  ngOnInit(): void {

  }


}
