import { Component, OnInit } from '@angular/core';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SearchStoreService } from 'src/app/search/services/store.service';
import { ViewSettingsBackendService } from 'src/app/search/services/view-params-backend.service';
import { Destroyer } from 'src/app/shared/abstract/destroyer';

@Component({
  selector: 'crng-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent extends Destroyer implements OnInit {
  constructor(
    private store: SearchStoreService, //
    private vsbs: ViewSettingsBackendService,
  ) {
    super();
  }

  ngOnInit() {
    this.store.viewParams$
      .pipe(
        switchMap((viewParams) => this.vsbs.save(viewParams)),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
}
