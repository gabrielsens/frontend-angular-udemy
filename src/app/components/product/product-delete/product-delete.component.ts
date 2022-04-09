import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name: '',
    price: undefined,
  };

  loading: boolean = true;

  id: string;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(this.id).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (e) => {
        this.productService.showMensage('Ocorreu um erro, tente novamente mais tarde!', true);
        console.error(e);
        setTimeout(() => {
          this.router.navigate(['/products'])
        }, 5000)
      },
      complete: () => this.loading = false
    });
  }

  deleteProduct(): void {
    this.loading = true
    this.productService.delete(this.id).subscribe({
      next: () => {
        this.productService.showMensage('Producto Excluido com Sucesso!');
        this.router.navigate(['/products']);
      },
      error: (e) => {
        this.productService.showMensage('Ocorreu um erro, tente novamente mais tarde!', true);
        console.error(e);
        setTimeout(() => {
          this.router.navigate(['/products'])
        }, 5000)
      },
      complete: () => this.loading = false
    })
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}
