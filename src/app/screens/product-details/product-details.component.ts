import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { finalize, map, take } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { RatingComponent } from 'src/app/shared/components/rating/rating.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RatingComponent, NgxSkeletonLoaderModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  isLoading: boolean = false;
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  productId = this.route.snapshot.params['id'];

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.isLoading = true;
    this.productsService.getProduct(this.productId)
    .pipe(
      take(1),
      finalize(() => (this.isLoading = false)),
      map((product) => {
        product.rating = Math.floor(product.rating);
        return product
      })
    )
    .subscribe(
      res => {
        this.product = res;
      }
    )
  }
}
