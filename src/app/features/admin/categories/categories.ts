import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../../../shared/components/popup/popup';
import { CategoryService } from '../../../core/services/category';
import { CategoryDTO } from '../../../dto/category.dto';
import { PageResponse } from '../../../model/pageResponse';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, PopupComponent],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class CategoriesComponent implements OnInit {
  items: CategoryDTO[] = [];
  
  isPopupOpen = false;
  popupConfig = { title: 'Category Form', closable: true, showConfirmButton: true, showCancelButton: true };
  editingItem: Partial<CategoryDTO> = {};

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (result: PageResponse<CategoryDTO>) => {
        this.items = result.data;
      },
      error: (err) => console.error('Error fetching categories:', err)
    });
  }

  openForm(item?: CategoryDTO) {
    if (item) {
      this.editingItem = { ...item };
      this.popupConfig.title = 'Edit Category';
    } else {
      this.editingItem = { name: '', description: '' };
      this.popupConfig.title = 'Add Category';
    }
    this.isPopupOpen = true;
  }

  saveItem() {
    if (this.editingItem.id) {
      this.categoryService.update(this.editingItem.id, this.editingItem as CategoryDTO).subscribe({
        next: () => {
          this.loadCategories();
          this.isPopupOpen = false;
        },
        error: (err) => console.error('Error updating category:', err)
      });
    } else {
      this.categoryService.create(this.editingItem as CategoryDTO).subscribe({
        next: () => {
          this.loadCategories();
          this.isPopupOpen = false;
        },
        error: (err) => console.error('Error creating category:', err)
      });
    }
  }

  deleteItem(id: number | undefined) {
    if (id && confirm('Are you sure you want to delete this category?')) {
      this.categoryService.delete(id).subscribe({
        next: () => this.loadCategories(),
        error: (err) => console.error('Error deleting category:', err)
      });
    }
  }
}
