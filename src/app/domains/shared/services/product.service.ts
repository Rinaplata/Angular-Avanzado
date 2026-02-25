import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Product } from "../models/product.model";
import { environment } from "@env/environment";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(param: { category_id?: string; category_slug?: string }) {
    const url = new URL(`${environment.apiUrl}/api/v1/products`);
    if (param.category_id) {
      url.searchParams.set("categoryId", param.category_id);
    }
    if (param.category_slug) {
      url.searchParams.set("categorySlug", param.category_slug);
    }
    return this.http.get<Product[]>(url.toString());
  }

  getOne(param: { product_id?: string; product_slug?: string }) {
    if (!param.product_id && !param.product_slug) {
      throw new Error("product_id or product_slug is required");
    }
    const endpoint = param.product_id
      ? `${environment.apiUrl}/api/v1/products/${param.product_id}`
      : `${environment.apiUrl}/api/v1/products/slug/${param.product_slug}`;
    return this.http.get<Product>(endpoint);
  }
}
