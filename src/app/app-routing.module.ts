import { NoAuthGuard } from './modules/shared/guards/no-auth/no-auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedLayoutComponent } from './modules/shared/layouts/logged-layout/logged-layout.component';

import { AuthGuard } from './modules/shared/guards/auth/auth.guard';

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
      }
    ],
    canActivateChild: [AuthGuard]
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
