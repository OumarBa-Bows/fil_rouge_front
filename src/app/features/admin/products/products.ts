import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../../../shared/components/popup/popup';
import { ProductService } from '../../../core/services/product';
import { CategoryService } from '../../../core/services/category';
import { DocumentService } from '../../../core/services/document';
import { Product } from '../../../model/product';
import { CategoryDTO } from '../../../dto/category.dto';
import { PageResponse } from '../../../model/pageResponse';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule, PopupComponent],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  items: Product[] = [];
  categories: CategoryDTO[] = [];
  /** product.id → blob object URL for the product image */
  imageUrls = new Map<number, string>();

  isPopupOpen = false;
  popupConfig = { title: 'Product Form', closable: true, showConfirmButton: true, showCancelButton: true };
  editingItem: Partial<Product> = {};

  selectedCategoryId: number | string = '';
  stockQuantity: number = 0;
  selectedFile: File | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private documentService: DocumentService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (result: PageResponse<CategoryDTO>) => {
        this.categories = result.data;
      },
      error: (err) => console.error('Error fetching categories:', err)
    });
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (result: PageResponse<Product>) => {
        console.log('Fetched products:', result.data);
        this.items = result.data;
        this.loadProductImages(this.items);
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  loadProductImages(products: Product[]) {
    // Revoke previous object URLs to avoid memory leaks
    this.imageUrls.forEach(url => URL.revokeObjectURL(url));
    this.imageUrls.clear();

    const productsWithDoc = products.filter(p => p.id != null && p.document?.fileName);

    if (!productsWithDoc.length) return;

    const requests = productsWithDoc.map(p =>
      this.documentService.getByFileName(p.document!.fileName).pipe(
        catchError(err => {
          console.error(`Failed to load image for product ${p.id}`, err);
          return of(null);
        })
      )
    );

    forkJoin(requests).subscribe(blobs => {
      blobs.forEach((blob, i) => {
        const product = productsWithDoc[i];
        if (blob && product.id != null) {
          this.imageUrls.set(product.id, URL.createObjectURL(blob));
        }
      });
    });
  }

  getImageUrl(product: Product): string {
    return product.id != null && this.imageUrls.has(product.id)
      ? this.imageUrls.get(product.id)!
      : 'https://placehold.co/300x300?text=No+Image';
  }

  ngOnDestroy() {
    // Clean up object URLs when component is destroyed
    this.imageUrls.forEach(url => URL.revokeObjectURL(url));
  }

  openForm(item?: Product) {
    if (item) {
      this.editingItem = { ...item };
      this.selectedCategoryId = item.category?.id || '';
      this.stockQuantity = item.stock?.quantity || 0;
      this.popupConfig.title = 'Edit Product';
    } else {
      this.editingItem = { name: '', description: '', price: 0 };
      this.selectedCategoryId = '';
      this.stockQuantity = 0;
      this.selectedFile = null;
      this.popupConfig.title = 'Add Product';
    }
    this.isPopupOpen = true;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  saveItem() {
    const categoryObj = this.categories.find(c => c.id === Number(this.selectedCategoryId));

    // Construct payload matching ProductDTO
    const productPayload: Product = {
      ...this.editingItem,
      category: categoryObj,
      stock: {
        id: this.editingItem.stock?.id || 0,
        quantity: this.stockQuantity,
        product: null as any // Backend usually ignores or handles this on create/update
      }
    } as Product;

    if (productPayload.id) {
      this.productService.update(productPayload.id, productPayload).subscribe({
        next: () => {
          this.loadProducts();
          this.isPopupOpen = false;
        },
        error: (err) => console.error('Error updating product:', err)
      });
    } else {
      this.productService.create(productPayload, this.selectedFile).subscribe({
        next: () => {
          this.loadProducts();
          this.isPopupOpen = false;
          this.selectedFile = null;
        },
        error: (err) => console.error('Error creating product:', err)
      });
    }
  }

  deleteItem(id: number | undefined) {
    if (id && confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error('Error deleting product:', err)
      });
    }
  }
}
