import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DefaultLayoutComponent} from './containers';
import {Page404Component} from './views/pages/page404/page404.component';
import {Page500Component} from './views/pages/page500/page500.component';
import {LoginComponent} from './views/pages/login/login.component';
import {RegisterComponent} from './views/pages/register/register.component';
import {AuthenticationGuard} from "./guards/authentication.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Inicio'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./views/category/category.module').then((m) => m.CategoryModule),
      },
      {
        path: 'subcategory',
        loadChildren: () =>
          import('./views/subcategory/subcategory.module').then((m) => m.SubcategoryModule),
      },
      {
        path: 'unit',
        loadChildren: () =>
          import('./views/unit/unit.module').then((m) => m.UnitModule),
      },
      {
        path: 'presentation',
        loadChildren: () =>
          import('./views/presentation/presentation.module').then((m) => m.PresentationModule),
      },
      {
        path: 'product-input',
        loadChildren: () =>
          import('./views/product-input/product-input.module').then((m) => m.ProductInputModule),
      },
      {
        path: 'product-output',
        loadChildren: () =>
          import('./views/product-output/product-output.module').then((m) => m.ProductOutputModule),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./views/product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'brand',
        loadChildren: () =>
          import('./views/brand/brand.module').then((m) => m.BrandModule),
      },
      {
        path: 'product-subcategory',
        loadChildren: () =>
          import('./views/product-subcategory/product-subcategory.module').then((m) => m.ProductSubcategoryModule),
      },
      {
        path: 'product-presentation',
        loadChildren: () =>
          import('./views/product-presentation/product-presentation.module').then((m) => m.ProductPresentationModule),
      },
      {
        path: 'specification',
        loadChildren: () =>
          import('./views/specification/specification.module').then((m) => m.SpecificationModule),
      },
      {
        path: 'specification-detail',
        loadChildren: () =>
          import('./views/specification-detail/specification-detail.module').then((m) => m.SpecificationDetailModule),
      },
      {
        path: 'product-detail',
        loadChildren: () =>
          import('./views/product-detail/product-detail.module').then((m) => m.ProductDetailModule),
      },
      // {
      //   path: 'theme',
      //   loadChildren: () =>
      //     import('./views/theme/theme.module').then((m) => m.ThemeModule)
      // },
      // {
      //   path: 'base',
      //   loadChildren: () =>
      //     import('./views/base/base.module').then((m) => m.BaseModule)
      // },
      // {
      //   path: 'buttons',
      //   loadChildren: () =>
      //     import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      // },
      // {
      //   path: 'forms',
      //   loadChildren: () =>
      //     import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      // },
      // {
      //   path: 'charts',
      //   loadChildren: () =>
      //     import('./views/charts/charts.module').then((m) => m.ChartsModule)
      // },
      // {
      //   path: 'icons',
      //   loadChildren: () =>
      //     import('./views/icons/icons.module').then((m) => m.IconsModule)
      // },
      // {
      //   path: 'notifications',
      //   loadChildren: () =>
      //     import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      // },
      // {
      //   path: 'widgets',
      //   loadChildren: () =>
      //     import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      // },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule),
        canActivate: [AuthenticationGuard]
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule],
  providers: [AuthenticationGuard],
})
export class AppRoutingModule {
}
