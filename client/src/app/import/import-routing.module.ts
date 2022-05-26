import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportComponent } from 'src/app/import/import/import.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ImportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportRoutingModule {}