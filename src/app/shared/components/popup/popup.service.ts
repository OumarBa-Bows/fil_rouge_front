import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from './popup';
import { PopupConfig, PopupRef } from './popup.type';
@Injectable({ providedIn: 'root' })
export class PopupService {
  constructor(private modalService: NgbModal) {}

  open<R = boolean>(config: PopupConfig, options?: NgbModalOptions): PopupRef<R> {
    const modalRef = this.modalService.open(PopupComponent, {
      size: config.size === 'full' ? 'xl' : config.size,
      backdrop: config.closeOnBackdropClick === false ? 'static' : true,
      ...options,
    });

    modalRef.componentInstance.config = config;

    const afterClosed = modalRef.result.then(
      (result: R) => result,
      () => undefined as R | undefined // dismissed (X, backdrop, Esc, or Cancel)
    );

    return {
      close: (result?: R) => modalRef.close(result),
      afterClosed,
    };
  }
}
