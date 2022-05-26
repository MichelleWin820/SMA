import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { Protein } from 'src/app/core/typings/protein';
import { SearchStoreService } from 'src/app/search/services/store.service';

@Injectable()
export class SelectService {
  private _totalCount = 0;
  private _checkedCount = 0;
  private _lastCkeckedId?: string;
  private readonly checkedSubj = new BehaviorSubject<Set<Protein>>(new Set());

  readonly checked$ = this.checkedSubj.asObservable();

  constructor(private readonly store: SearchStoreService) {}

  get isAllChecked(): boolean {
    return this._totalCount > 0 && this._checkedCount === this._totalCount;
  }

  get checkedCount(): number {
    return this._checkedCount;
  }

  checkAll(): void {
    forkJoin([
      this.store.proteins$.pipe(take(1)), //
      this.store.proteinsTotal$.pipe(take(1)),
    ]).subscribe(([proteins, total]) => {
      this._totalCount = total;
      this._checkedCount = total;
      this._lastCkeckedId = void 0;
      this.checkedSubj.next(new Set(proteins));
    });
  }

  oneCheck(protein: Protein, shiftKey: boolean): void {
    forkJoin([
      this.checkedSubj.pipe(take(1)), //
      this.store.proteins$.pipe(take(1)),
      this.store.proteinsTotal$.pipe(take(1)),
    ]).subscribe(([set, proteins, total]) => {
      const range: readonly Protein[] = shiftKey ? this.getShiftRange(protein, proteins) : [];

      if (set.has(protein)) {
        set.delete(protein);
        range.forEach((p) => set.delete(p));
      } else {
        set.add(protein);
        range.forEach((p) => set.add(p));
      }

      this._totalCount = total;
      this._checkedCount = set.size;
      this._lastCkeckedId = set.size > 0 ? protein.accession : void 0;

      this.checkedSubj.next(new Set(set));
    });
  }

  masterCheck(): void {
    if (!this.isAllChecked) {
      this.checkAll();
    } else {
      this._checkedCount = 0;
      this._lastCkeckedId = void 0;
      this.checkedSubj.next(new Set());
    }
  }

  private getShiftRange(shift: Protein, proteins: readonly Protein[]): readonly Protein[] {
    let lastIdx = -1;
    let shiftIdx = -1;

    for (let idx = 0; idx < proteins.length; idx++) {
      const protein = proteins[idx];
      if (protein === shift) shiftIdx = idx;
      if (protein.accession === this._lastCkeckedId) lastIdx = idx;
      if (shiftIdx > -1 && (lastIdx > -1 || !this._lastCkeckedId)) break;
    }

    if (shiftIdx < lastIdx) {
      return proteins.slice(shiftIdx, lastIdx + 1);
    }

    return proteins.slice(lastIdx, shiftIdx + 1);
  }
}
