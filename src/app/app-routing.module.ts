import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedLayoutComponent } from './modules/shared/layouts/logged-layout/logged-layout.component';

import { AuthGuard } from './modules/shared/guards/auth/auth.guard';
import { AdminGuard } from './modules/shared/guards/admin/admin.guard';
import { NoAuthGuard } from './modules/shared/guards/no-auth/no-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'starships', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./modules/register/register.module').then(
        (m) => m.RegisterModule
      ),
    canActivate: [NoAuthGuard]
  },
  {
    path: '',
    component: LoggedLayoutComponent,
    children: [
      {
        path: 'starships',
        loadChildren: () =>
          import('./modules/starships-list/starships-list.module').then(
            (m) => m.StarshipsListModule
          )
      },
      {
        path: 'starship/:id',
        loadChildren: () =>
          import('./modules/starship-detail/starship-detail.module').then(
            (m) => m.StarshipDetailModule
          )
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./modules/extra/extra.module').then((m) => m.ExtraModule)
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./modules/admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AdminGuard]
      }
    ],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/error/error.module').then((m) => m.ErrorModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
