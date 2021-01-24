import { LoggedLayoutComponent } from './modules/shared/layouts/logged-layout/logged-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'starships', pathMatch: 'full' },
  {
    path: 'register',
    loadChildren: () =>
      import('./modules/register/register.module').then((m) => m.RegisterModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule)
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
    ]
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
