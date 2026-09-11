import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../../../shared/components/popup/popup';
import { StockService } from '../../../core/services/stock';
import { StockDTO } from '../../../dto/stock.dto';
import { PageResponse } from '../../../model/pageResponse';

@Component({
  selector: 'app-admin-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, PopupComponent],
  templateUrl: './stock.html',
  styleUrl: './stock.scss'
})
export class StockComponent implements OnInit {
  items: StockDTO[] = [];

  isPopupOpen = false;
  popupConfig = { title: 'Stock Adjustment Form', closable: true, showConfirmButton: true, showCancelButton: true };
  editingItem: Partial<StockDTO> & { productName?: string } = {};

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.loadStocks();
  }

  loadStocks() {
    this.stockService.getAll().subscribe({
      next: (result: PageResponse<StockDTO>) => {
        this.items = result.data;
      },
      error: (err) => console.error('Error fetching stocks:', err)
    });
  }

  openForm(item?: StockDTO) {
    if (item) {
      this.editingItem = { ...item, productName: item.product?.name || '' };
      this.popupConfig.title = 'Update Stock';
    } else {
      this.editingItem = { quantity: 0, location: '' };
      this.popupConfig.title = 'Add Stock Entry';
    }
    this.isPopupOpen = true;
  }

  saveItem() {
    if (this.editingItem.id) {
      this.stockService.update(this.editingItem.id, this.editingItem as StockDTO).subscribe({
        next: () => {
          this.loadStocks();
          this.isPopupOpen = false;
        },
        error: (err) => console.error('Error updating stock:', err)
      });
    } else {
      this.stockService.create(this.editingItem as StockDTO).subscribe({
        next: () => {
          this.loadStocks();
          this.isPopupOpen = false;
        },
        error: (err) => console.error('Error creating stock:', err)
      });
    }
  }

  deleteItem(id: number | undefined) {
    if (id && confirm('Are you sure you want to delete this stock entry?')) {
      this.stockService.delete(id).subscribe({
        next: () => this.loadStocks(),
        error: (err) => console.error('Error deleting stock:', err)
      });
    }
  }
}
