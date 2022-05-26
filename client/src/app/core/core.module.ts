import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from 'src/app/core/auth/guards/auth.guard';
import { AuthBackendService } from 'src/app/core/auth/services/auth-backend.service';
import { AuthStoreService } from 'src/app/core/auth/services/store.service';
import { authReducer } from 'src/app/core/auth/store/reducers';
import { authFeatureKey } from 'src/app/core/auth/store/state';
import { DictionariesBackendService } from 'src/app/core/services/dictionaries-backend.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { UploadService } from 'src/app/core/services/upload.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, //
    HttpClientModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
  ],
  providers: [
    AuthGuard,
    UploadService,
    SocketService,
    AuthStoreService,
    AuthBackendService, //
    DictionariesBackendService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
