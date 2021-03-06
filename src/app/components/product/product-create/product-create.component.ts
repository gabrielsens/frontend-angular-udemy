import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  product: Product = {
    name: "",
    price: undefined
  }

  validate: boolean = false;

  ngOnInit(): void {
    
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMensage("Produto Criado");
      this.router.navigate(['/products'])
    })
  }

  cancel() :void {
    this.router.navigate(['/products'])
  }
  handleValidate() {
    console.log('12')
    this.validate = this.product.name != "" && this.product.price != undefined ? true : false;
  }
}
