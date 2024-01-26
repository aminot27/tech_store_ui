import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {Page404Component} from './page404/page404.component';
import {Page500Component} from './page500/page500.component';
import {
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  TableModule,
  WidgetModule,
  SharedModule,
  ProgressModule,
  CalloutModule,
  NavModule,
  TabsModule,
  ButtonGroupModule, BadgeModule, PaginationModule, ModalModule
} from '@coreui/angular';
import {IconModule, IconSetService} from '@coreui/icons-angular';
import {ChartjsModule} from "@coreui/angular-chartjs";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,


  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [

    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    WidgetModule,
    ProgressModule,
    SharedModule,
    TableModule,
    DropdownModule,
    ChartjsModule,
    CalloutModule,
    TabsModule,
    NavModule,
    ReactiveFormsModule,
    ButtonGroupModule,
    BadgeModule,
    PaginationModule,
    ModalModule,
  ],
})
export class PagesModule {
}
