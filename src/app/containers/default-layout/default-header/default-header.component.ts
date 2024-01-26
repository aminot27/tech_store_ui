import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClassToggleService, HeaderComponent} from '@coreui/angular';
import {AuthenticationService} from "../../../services/security/authentication.service";
import {UserRolModel} from "../../../models/security-models/user-rol.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";
  @Input() currentRol: UserRolModel = new UserRolModel();
  @Output() selectedRol = new EventEmitter<UserRolModel>;
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  roles: UserRolModel[] = [];
  currentUser: any = {};

  constructor(private classToggler: ClassToggleService,
              private _authenticationService: AuthenticationService, private _router: Router) {
    super();
  }

  ngOnInit(): void {
    this.roles = this._authenticationService.userRoleValues;
    this.currentUser = JSON.parse(localStorage.getItem('authUser')).user;
  }

  setCurrentRol(rol: UserRolModel) {
    this.currentRol = rol;
    this.selectedRol.emit(this.currentRol);
    this._router.navigate(['/dashboard']);
  }

  logout(): void {
    this._authenticationService.logout();
  }
}
