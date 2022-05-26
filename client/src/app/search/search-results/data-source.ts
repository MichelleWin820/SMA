import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Protein } from 'src/app/core/typings/protein';
import { SearchStoreService } from 'src/app/search/services/store.service';

export class ProteinsDataSource implements DataSource<Protein> {
  constructor(private store: SearchStoreService) {}

  connect(collectionViewer: CollectionViewer): Observable<readonly Protein[]> {
    return this.store.proteins$;
  }

  disconnect(collectionViewer: CollectionViewer): void {}
}
