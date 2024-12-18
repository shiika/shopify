import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product, ProductPayload, ProductsResponse } from "../models/product.model";
import { HttpRequestService } from "./http-request.service";

@Injectable({
    providedIn: 'root'
})

export class ProductsService {
    httpService = inject(HttpRequestService);

    getProducts(body: ProductPayload): Observable<ProductsResponse> {
        return this.httpService.getRequest(`products/search`, {
            params: {...body}
        });
    }

    filterProducts(body: ProductPayload): Observable<ProductsResponse> {
        return this.httpService.getRequest(`products/category/${body.category}`, {
            params: {...body}
        });
    }

    getProduct(id: number): Observable<Product> {
        return this.httpService.getRequest(`products/${id}`);
    }
}