import {Component, OnInit} from '@angular/core';

import {navItems} from './_nav';
import {IconSetService} from "@coreui/icons-angular";
import {cilDrop, cilSpeedometer} from "@coreui/icons";
import {AuthenticationService} from "../../services/security/authentication.service";
import {ModuleModel} from "../../models/security-models/module.model";
import {UserRolModel} from "../../models/security-models/user-rol.model";
import {iconSubset} from "../../icons/icon-subset";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {

  public navItems = [];
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  currentRol: UserRolModel;

  constructor(public iconSet: IconSetService, private _authService: AuthenticationService, private _router: Router) {
    iconSet.icons = {...iconSubset};
  }

  ngOnInit(): void {
    const roles = this._authService.userRoleValues;
    if (roles.length != 0) {
      this.currentRol = roles[0];
      this.setNavigationItems(this.currentRol);
    }
  }

  setNavigationItems(selectedRol: UserRolModel): void {
    this.navItems = [
      {
        name: 'MENU',
        url: '/dashboard',
        iconComponent: {name: 'cil-speedometer'},
        badge: {
          color: 'info',
          text: 'NEW'
        },
      },
      {
        title: true,
        name: 'Gestión de Almacén'
      },
    
    ]
    const modules = selectedRol.modules;
    modules.forEach(module => {
      const item = {
        name: module.module,
        url: module.url,
        iconComponent: {name: module.icon},
        children: module.views.map(view => {
          return {
            name: view.view,
            url: view.path
          }
        })
      }
      this.navItems.push(item)
    })
  }
}