import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewParamsResolver } from 'src/app/search/resolvers/view-params.resolver';
import { SearchComponent } from 'src/app/search/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    resolve: {
      viewParams: ViewParamsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
