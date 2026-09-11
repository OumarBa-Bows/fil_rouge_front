import { Component, Input } from '@angular/core';
import { Product } from '../../../model/product';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  standalone: true
})
export class ProductCard {
  @Input() product: Product = {
    id: 1,
    name: 'Produit Exemple',
    description: 'Description du produit',
    price: 98000,
    category: { id: 1, name: 'Accessoires', description: '', products: [] },
    stock: { id: 1, quantity: 10, product: null as any },
    badge: 'NEW',
    oldPrice: 119000,
    rating: 4
  };

  get stars(): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }

  get badgeClass(): string {
    if (!this.product.badge) return '';
    if (this.product.badge === 'NEW') return 'badge--new';
    if (this.product.badge === 'HOT') return 'badge--hot';
    return 'badge--discount';
  }
}
