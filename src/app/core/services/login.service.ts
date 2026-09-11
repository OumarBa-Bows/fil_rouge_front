import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../features/login/login';

@Injectable({
  providedIn: 'root'
})
export class LoginModalService {

  constructor(private modalService: NgbModal) {}

  open() {
    return this.modalService.open(LoginComponent, {
      centered: true,
      size: 'md'
    }).result;
  }
}
