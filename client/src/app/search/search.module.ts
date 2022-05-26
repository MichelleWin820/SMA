import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LinkifyPipe } from 'src/app/search/pipes/linkify.pipe';
import { ViewParamsResolver } from 'src/app/search/resolvers/view-params.resolver';
import { ActiveFiltersSelectComponent } from 'src/app/search/search-form/filter-select/active-filters-select.component';
import { TableColumnsSelectComponent } from 'src/app/search/search-form/table-columns-select/table-columns-select.component';
import { SearchResultsViewPortDirective } from 'src/app/search/search-results/searct-results-view-port.directive';
import { SearchRoutingModule } from 'src/app/search/search-routing.module';
import { SearchBackendService } from 'src/app/search/services/search-backend.service';
import { SearchStoreService } from 'src/app/search/services/store.service';
import { ViewSettingsBackendService } from 'src/app/search/services/view-params-backend.service';
import { searchReducer } from 'src/app/search/store/reducers';
import { searchFeatureKey } from 'src/app/search/store/state';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    LinkifyPipe,
    SearchComponent,
    SearchFormComponent,
    SearchResultsComponent, //
    TableColumnsSelectComponent,
    ActiveFiltersSelectComponent,
    SearchResultsViewPortDirective,
  ],
  imports: [
    CommonModule, //
    DragDropModule,
    ReactiveFormsModule,
    SearchRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forFeature(searchFeatureKey, searchReducer),
    EffectsModule.forFeature([]),
  ],
  providers: [
    SearchStoreService, //
    ViewParamsResolver,
    SearchBackendService,
    ViewSettingsBackendService,
  ],
})
export class SearchModule {}
