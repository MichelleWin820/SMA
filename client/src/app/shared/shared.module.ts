import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { CopyTextButtonComponent } from 'src/app/shared/copy-text-button/copy-text-button.component';
import { DisableFocusDirective } from 'src/app/shared/directives/disable-focus.directive';
import { FilterSelectComponent } from 'src/app/shared/filter-select/filter-select.component';
import { MultiSelectComponent } from 'src/app/shared/multi-select/multi-select.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SearchInputComponent } from './search-input/search-input.component';

@NgModule({
  declarations: [
    MainMenuComponent, //
    MainFooterComponent,
    SearchInputComponent,
    MultiSelectComponent,
    FilterSelectComponent,
    DisableFocusDirective,
    CopyTextButtonComponent,
  ],
  exports: [
    MainMenuComponent, //
    MainFooterComponent,
    MultiSelectComponent,
    SearchInputComponent,
    MultiSelectComponent,
    FilterSelectComponent,
    CopyTextButtonComponent,
  ],
  imports: [
    CommonModule, //
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
