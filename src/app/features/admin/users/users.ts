import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../../../shared/components/popup/popup';
import { UserService } from '../../../core/services/user';
import { RoleService } from '../../../core/services/role';
import { User } from '../../../model/user';
import { Role } from '../../../model/role';
import { PageResponse } from '../../../model/pageResponse';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, PopupComponent],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class UsersComponent implements OnInit {
  items: User[] = [];
  roles: Role[] = [];

  isPopupOpen = false;
  popupConfig = { title: 'User Form', closable: true, showConfirmButton: true, showCancelButton: true };
  editingItem: Partial<User> = {};
  selectedRoleId: number | string = '';

  constructor(private userService: UserService, private roleService: RoleService) {}

  ngOnInit() {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers() {
    this.userService.getAll().subscribe({
      next: (result: PageResponse<User>) => {
        this.items = result.data;
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }

  loadRoles() {
    this.roleService.getAll().subscribe({
      next: (result: PageResponse<Role>) => {
        this.roles = result.data;
      },
      error: (err) => console.error('Error fetching roles:', err)
    });
  }

  openForm(item?: User) {
    if (item) {
      this.editingItem = { ...item };
      this.selectedRoleId = item.roles && item.roles.length > 0 ? item.roles[0].id || '' : '';
      this.popupConfig.title = 'Edit User';
    } else {
      this.editingItem = { firstName: '', lastName: '', email: '', username: '', password: '' };
      this.selectedRoleId = '';
      this.popupConfig.title = 'Add User';
    }
    this.isPopupOpen = true;
  }

  saveItem() {
    const selectedRole = this.roles.find(r => r.id === Number(this.selectedRoleId));
    const userPayload: User = {
      ...(this.editingItem as User),
      roles: selectedRole ? [selectedRole] : []
    };

    if (userPayload.id) {
      this.userService.update(userPayload.id, userPayload).subscribe({
        next: () => {
          this.loadUsers();
          this.isPopupOpen = false;
        },
        error: (err) => console.error('Error updating user:', err)
      });
    } else {
      this.userService.create(userPayload).subscribe({
        next: () => {
          this.loadUsers();
          this.isPopupOpen = false;
        },
        error: (err) => console.error('Error creating user:', err)
      });
    }
  }

  deleteItem(id: number | undefined) {
    if (id && confirm('Are you sure you want to delete this user?')) {
      this.userService.delete(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Error deleting user:', err)
      });
    }
  }
}

