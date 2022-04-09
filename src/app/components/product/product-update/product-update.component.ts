import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  
  product: Product  = {
    name: "",
    price: undefined
  };

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
      }
    })
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe({
      next: () => {
      this.productService.showMensage('Produto Atualizado com sucesso')
      this.router.navigate(['/products']);
      },
      error: (error) => {
        this.productService.showMensage("Ocorreu um erro, tente novamente mais tarde!", true)
        console.error(error);
      }
    })
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}
