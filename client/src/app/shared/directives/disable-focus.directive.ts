import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[crngDisableFocus]' })
export class DisableFocusDirective implements AfterViewInit {
  constructor(private hostElement: ElementRef) {}

  public ngAfterViewInit(): void {
    const el: any = this.hostElement ? this.hostElement.nativeElement : null;
    if (!el) return;

    el._focus = el.focus;
    el.focus = () => {};
  }
}
