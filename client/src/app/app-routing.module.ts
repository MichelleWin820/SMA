import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/guards/auth.guard';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '404',
    component: NotFoundComponent,
  },

  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then((m) => m.SearchModule),
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'import',
    canLoad: [AuthGuard],
    loadChildren: () => import('./import/import.module').then((m) => m.ImportModule),
  },

  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
