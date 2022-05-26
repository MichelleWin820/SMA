import { Component, Input } from '@angular/core';
import { MatTooltip, TooltipPosition } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { putToClipboard } from 'src/app/core/utils/dom.utils';
import { Destroyer } from 'src/app/shared/abstract/destroyer';

@Component({
  selector: 'crng-copy-text-button',
  templateUrl: './copy-text-button.component.html',
  styleUrls: ['./copy-text-button.component.scss'],
})
export class CopyTextButtonComponent extends Destroyer {
  @Input() public text$?: Observable<string>;
  @Input() public btnClass = '';
  @Input() public disabled = false;
  @Input() public tooltipPosition: TooltipPosition = 'above';
  @Input() public tooltipStartText = 'Copy';
  @Input() public tooltipCopiedText = 'Copied!';

  public tooltipText = this.tooltipStartText;

  constructor() {
    super();
  }

  public copyText(tooltip: MatTooltip, e?: MouseEvent) {
    if (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }

    this.text$?.pipe(take(1)).subscribe((text) => {
      putToClipboard(text);
      tooltip.show(0);
      this.tooltipText = this.tooltipCopiedText;
    });
  }

  public reset() {
    this.tooltipText = this.tooltipStartText;
  }
}
