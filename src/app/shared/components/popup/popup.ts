import {
  Component, EventEmitter, Input, Output, HostListener, ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupConfig } from './popup.type';
import { POPUP_DEFAULT_CONFIG } from './popup.config';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (open) {
      <div class="popup-backdrop" (click)="onBackdropClick()">
        <div class="popup-panel popup-{{ cfg.variant }} popup-size-{{ cfg.size }}"
             role="dialog" aria-modal="true"
             [attr.aria-label]="cfg.title || 'Popup'"
             (click)="$event.stopPropagation()">
          <header class="popup-header" *ngIf="cfg.title || cfg.closable">
            <h2 class="popup-title">{{ cfg.title }}</h2>
            <button *ngIf="cfg.closable" type="button" class="popup-close"
                    aria-label="Close" (click)="close()">&times;</button>
          </header>
          <section class="popup-body">
            <ng-content><p *ngIf="cfg.message">{{ cfg.message }}</p></ng-content>
          </section>
          <footer class="popup-footer" *ngIf="cfg.showConfirmButton || cfg.showCancelButton">
            <button *ngIf="cfg.showCancelButton" type="button"
                    class="popup-btn popup-btn-cancel" (click)="cancel()">{{ cfg.cancelText }}</button>
            <button *ngIf="cfg.showConfirmButton" type="button"
                    class="popup-btn popup-btn-confirm" (click)="confirm()">{{ cfg.confirmText }}</button>
          </footer>
        </div>
      </div>
    }
  `,
  styleUrl: './popup.scss',
})
export class PopupComponent {
  @Input() open = false;
  @Input() config: PopupConfig = {};

  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  get cfg(): PopupConfig {
    return { ...POPUP_DEFAULT_CONFIG, ...this.config };
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open && this.cfg.closable) this.close();
  }

  onBackdropClick(): void {
    if (this.cfg.closeOnBackdropClick) this.close();
  }

  close(): void { this.open = false; this.closed.emit(); }
  confirm(): void { this.confirmed.emit(); this.close(); }
  cancel(): void { this.cancelled.emit(); this.close(); }
}
