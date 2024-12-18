import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { debounceTime, distinctUntilChanged, finalize, take } from 'rxjs/operators';
import { Product, ProductPayload } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ProductComponent } from '../../components/product/product.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule, 
    ProductComponent, 
    InputTextModule, 
    ReactiveFormsModule, 
    DropdownModule,
    PaginatorModule,
    NgxSkeletonLoaderModule],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = false;
  pageSize: number = 9;
  pageNo: WritableSignal<number> = signal(0);
  searchTerm: WritableSignal<string> = signal('');
  category: WritableSignal<string> = signal('');
  sortBy: WritableSignal<string> = signal('');
  totalCount: number = 0;
  productsService = inject(ProductsService);
  fb: FormBuilder = inject(FormBuilder);

  searchControl: FormControl = new FormControl('');

  categories: {name: string; value: string}[] = [
    {
      name: "Fragrances", 
      value: "fragrances"
    },
    {
      name: "Furniture", 
      value: "furniture"
    },
    {
      name: "Groceries", 
      value: "groceries"
    },
  ];

  sortItems: {name: string; value: string}[] = [
    {
      name: "Price: Low to High", 
      value: "price"
    },
    {
      name: "Rating: Low to High", 
      value: "rating"
    },
  ];

  destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      this.loadProducts();
    })
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadOnSearch();
  }

  onPageChange(event: any) {
    this.pageNo.set(event.first);
  }

  private loadOnSearch() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {
        this.searchTerm.set(value);
        this.pageNo.set(0);
        this.loadProducts();
      });
  }

  private loadProducts() {
    this.isLoading = true;
    const payload: ProductPayload = {
      limit: this.pageSize,
      skip: this.pageNo() * this.pageSize,
      q: this.searchTerm(),
      category: this.category(),
      sortBy: this.sortBy()
    };

    const productsRequest = this.category() ? this.productsService.filterProducts(payload) : this.productsService.getProducts(payload);
    productsRequest
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((res) => {
        if (res.products?.length) this.products = res.products;
        this.totalCount = res.total;
      });
  }
}
