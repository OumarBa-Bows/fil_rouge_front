import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../core/services/auth.service';
import {tap} from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Connexion</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss()">
      </button>
    </div>

    <div class="modal-body">
      <form #loginForm="ngForm">
        <div class="mb-3">
          <label>Username</label>
          <input
            type="text"
            class="form-control"
            [(ngModel)]="username"
            name="username"
            required>
        </div>

        <div class="mb-3">
          <label>Mot de passe</label>
          <input
            type="password"
            class="form-control"
            [(ngModel)]="password"
            name="password"
            required>
        </div>
      </form>
    </div>

    <div class="modal-footer">
      <button
        class="btn btn-secondary"
        (click)="activeModal.dismiss()">
        Annuler
      </button>

      <button
        class="btn btn-primary"
        (click)="login()">
        Se connecter
      </button>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(public activeModal: NgbActiveModal, public authService: AuthService) {}

  login(): void {
    debugger
    this.authService.login(this.username, this.password).subscribe(token =>{
      console.log("token ", token)
      if (token){
        this.authService.saveToken(token);
        this.closeModal()
      }
    })

  }

  closeModal(){
    this.activeModal.close();
  }

}
