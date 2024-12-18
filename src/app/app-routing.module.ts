import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "home", loadComponent: () => import('./screens/home/home.component').then(m => m.HomeComponent) },
  { path: "products", loadComponent: () => import('./screens/products-list/products-list.component').then(m => m.ProductsListComponent) },
  { path: "products/:id", loadComponent: () => import('./screens/product-details/product-details.component').then(m => m.ProductDetailsComponent) },
  { path: "", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
