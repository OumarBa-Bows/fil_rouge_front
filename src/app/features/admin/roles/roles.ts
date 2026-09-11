import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../../../shared/components/popup/popup';
import { RoleService } from '../../../core/services/role';
import { Role } from '../../../model/role';
import { PageResponse } from '../../../model/pageResponse';

@Component({
  selector: 'app-admin-roles',
  standalone: true,
  imports: [CommonModule, FormsModule, PopupComponent],
  templateUrl: './roles.html',
  styleUrl: './roles.scss'
})
export class RolesComponent implements OnInit {
  items: Role[] = [];

  isPopupOpen = false;
  popupConfig = { title: 'Role Form', closable: true, showConfirmButton: true, showCancelButton: true };
  editingItem: Partial<Role> = {};

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getAll().subscribe({
      next: (result: PageResponse<Role>) => {
        this.items = result.data;
      },
      error: (err) => console.error('Error fetching roles:', err)
    });
  }

  openForm(item?: Role) {
    if (item) {
      this.editingItem = { ...item };
      this.popupConfig.title = 'Edit Role';
    } else {
      this.editingItem = { name: '', description: '' };
      this.popupConfig.title = 'Add Role';
    }
    this.isPopupOpen = true;
  }

  saveItem() {
    if (this.editingItem.id) {
      this.roleService.update(this.editingItem.id, this.editingItem as Role).subscribe({
        next: () => {
          this.loadRoles();
          this.isPopupOpen = false;
        },
        error: (err) => console.error('Error updating role:', err)
      });
    } else {
      this.roleService.create(this.editingItem as Role).subscribe({
        next: () => {
          this.loadRoles();
          this.isPopupOpen = false;
        },
        error: (err) => console.error('Error creating role:', err)
      });
    }
  }

  deleteItem(id: number | undefined) {
    if (id && confirm('Are you sure you want to delete this role?')) {
      this.roleService.delete(id).subscribe({
        next: () => this.loadRoles(),
        error: (err) => console.error('Error deleting role:', err)
      });
    }
  }
}

