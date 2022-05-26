import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { forkJoin, fromEvent } from 'rxjs';
import { debounceTime, filter, switchMap, take, takeUntil } from 'rxjs/operators';
import { SearchStoreService } from 'src/app/search/services/store.service';
import { Destroyer } from 'src/app/shared/abstract/destroyer';

@Directive({ selector: '[crngSearchResultsViewPort]' })
export class SearchResultsViewPortDirective extends Destroyer implements AfterViewInit {
  constructor(
    private hostElementRef: ElementRef, //
    private readonly store: SearchStoreService,
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.store.activeFilters$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => this.calculateTableViewPort(), 0);
    });

    const host: HTMLDivElement = this.hostElementRef.nativeElement;
    if (host) {
      fromEvent(host, 'scroll')
        .pipe(
          debounceTime(300), //
          filter(() => this.isScrollGreaterThenLimit()),
          switchMap(() => {
            return forkJoin([
              this.store.viewParams$.pipe(take(1)), //
              this.store.proteins$.pipe(take(1)),
              this.store.proteinsTotal$.pipe(take(1)),
            ]);
          }),
          filter(([, proteins, total]) => proteins.length < total),
          switchMap(([viewParams, proteins]) => {
            return this.store.loadProteinsPage({
              ...viewParams,
              filters: {
                ...viewParams.filters,
                skip: proteins.length,
              },
            });
          }),
          takeUntil(this.destroy$),
        )
        .subscribe();
    }
  }

  private isScrollGreaterThenLimit(): boolean {
    const host: HTMLDivElement = this.hostElementRef.nativeElement;
    if (!host) return false;

    const scrollTop = host.scrollTop;
    const viewHeight = host.offsetHeight;
    const scrollHeight = host.scrollHeight;

    const limit = 0.75;
    const scrollPercent = scrollTop / (scrollHeight - viewHeight);

    return scrollPercent > limit;
  }

  private calculateTableViewPort() {
    const host: HTMLDivElement = this.hostElementRef.nativeElement;
    if (!host) return;

    const table: HTMLTableElement | null = host.querySelector('table');
    if (!table) return;

    const footerHeight = 40;
    const shadowHeight = 12;
    host.style.maxHeight = `calc(100vh - ${table.offsetTop + footerHeight + shadowHeight}px)`;
  }
}
