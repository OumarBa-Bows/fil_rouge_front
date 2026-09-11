import { Component } from '@angular/core';
import {Product} from '../../../model/product';
import {ProductCard} from '../../../shared/components/product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  templateUrl: './Products.html',
  styleUrl: './Products.scss',
  standalone: true
})
export class Products {
  activeTab: string = 'Ordinateurs';

  tabs: string[] = ['Ordinateurs', 'Smartphones', 'Photo & Vidéo', 'Accessoires'];

  allProducts: Product[] = [
    {
      id: 1,
      name: 'Casque Audio Premium Pro',
      description: 'Casque sans fil avec réduction de bruit active',
      price: 89900,
      category: { id: 1, name: 'Ordinateurs', description: '', products: [] },
      stock: { id: 1, quantity: 15, product: null as any },
      badge: 'NEW',
      oldPrice: 119900,
      rating: 4
    },
    {
      id: 2,
      name: 'MacBook Pro Slim 14"',
      description: 'Laptop ultra-slim avec écran Retina',
      price: 980000,
      category: { id: 1, name: 'Ordinateurs', description: '', products: [] },
      stock: { id: 2, quantity: 8, product: null as any },
      badge: '-10%',
      oldPrice: 1090000,
      rating: 5
    },
    {
      id: 3,
      name: 'Tablette Pro 12" Dark',
      description: 'Tablette professionnelle haute performance',
      price: 575000,
      category: { id: 1, name: 'Ordinateurs', description: '', products: [] },
      stock: { id: 3, quantity: 12, product: null as any },
      oldPrice: undefined,
      rating: 4
    },
    {
      id: 4,
      name: 'Casque Studio Gris Pro',
      description: 'Casque professionnel pour studio',
      price: 65000,
      category: { id: 1, name: 'Ordinateurs', description: '', products: [] },
      stock: { id: 4, quantity: 20, product: null as any },
      badge: undefined,
      oldPrice: 85000,
      rating: 5
    },
    {
      id: 5,
      name: 'iPhone 15 Pro Max',
      description: 'Smartphone avec puce A17 Pro',
      price: 850000,
      category: { id: 2, name: 'Smartphones', description: '', products: [] },
      stock: { id: 5, quantity: 10, product: null as any },
      badge: 'NEW',
      oldPrice: undefined,
      rating: 5
    },
    {
      id: 6,
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Le meilleur Android du marché',
      price: 720000,
      category: { id: 2, name: 'Smartphones', description: '', products: [] },
      stock: { id: 6, quantity: 7, product: null as any },
      badge: '-15%',
      oldPrice: 850000,
      rating: 4
    },
    {
      id: 7,
      name: 'Sony A7 IV',
      description: 'Appareil photo hybride plein format',
      price: 1450000,
      category: { id: 3, name: 'Photo & Vidéo', description: '', products: [] },
      stock: { id: 7, quantity: 5, product: null as any },
      badge: 'NEW',
      oldPrice: undefined,
      rating: 5
    },
    {
      id: 8,
      name: 'Canon EOS R50',
      description: 'Reflex numérique pour débutants',
      price: 560000,
      category: { id: 3, name: 'Photo & Vidéo', description: '', products: [] },
      stock: { id: 8, quantity: 9, product: null as any },
      badge: undefined,
      oldPrice: 620000,
      rating: 4
    },
    {
      id: 9,
      name: 'Clavier Mécanique RGB',
      description: 'Clavier gaming avec switches Cherry MX',
      price: 45000,
      category: { id: 4, name: 'Accessoires', description: '', products: [] },
      stock: { id: 9, quantity: 25, product: null as any },
      badge: 'HOT',
      oldPrice: 55000,
      rating: 4
    },
    {
      id: 10,
      name: 'Souris Gaming Pro',
      description: 'Souris optique 16000 DPI',
      price: 28000,
      category: { id: 4, name: 'Accessoires', description: '', products: [] },
      stock: { id: 10, quantity: 30, product: null as any },
      badge: undefined,
      oldPrice: undefined,
      rating: 3
    },
  ];

  get filteredProducts(): Product[] {
    return this.allProducts.filter(p => p.category?.name === this.activeTab);
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }
}
