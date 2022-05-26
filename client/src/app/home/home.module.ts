import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HomeBannerComponent } from 'src/app/home/banner/banner.component';
import { HomeRoutingModule } from 'src/app/home/home-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeSearchBlockComponent } from './search-block/search-block.component';

@NgModule({
  declarations: [
    HomeComponent, //
    HomeBannerComponent,
    HomeSearchBlockComponent,
  ],
  imports: [
    CommonModule, //
    MatButtonModule,
    HomeRoutingModule,
  ],
})
export class HomeModule {}
