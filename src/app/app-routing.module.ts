import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./layout/dashboard/dashboard.component').then(
        m => m.DashboardComponent
      ),
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'subscribers' },
      {
        path: 'subscribers',
        loadComponent: () =>
          import(
            './entities/subscribers/subscriber-list/subscriber-list.component'
          ).then(m => m.SubscriberListComponent),
      },
      {
        path: 'subscribers/:id',
        loadComponent: () =>
          import(
            './entities/subscribers/subscriber-update/subscriber-update.component'
          ).then(m => m.SubscriberUpdateComponent),
      },
    ],
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
