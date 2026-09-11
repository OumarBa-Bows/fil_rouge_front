import { Component } from '@angular/core';
import {LoginComponent} from '../../../features/login/login';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: true
})
export class Navbar {

  constructor(private modalService: NgbModal) {}


  openLogin() {
    return this.modalService.open(LoginComponent, {
      centered: true,
      size: 'md'
    }).result;
  }
}
