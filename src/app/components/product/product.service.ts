import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  base_url = `${environment.mainUrl}/products`

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMensage(msg: string, isError: boolean = false): void{
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }


  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.base_url, product)
  } 

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.base_url);
  }

  readById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.base_url}/${id}`)
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.base_url}/${product.id}`, product)
  }

  delete(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.base_url}/${id}`);
  }
}
