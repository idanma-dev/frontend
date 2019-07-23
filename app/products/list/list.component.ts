import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/Product.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  isSort = 1;
  proucts: Product[];
  displayedColumns = ['Name', 'Description', 'Amount', 'strDate', 'IsPrivate', 'actions'];

  constructor(private service: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
  }

  sortByTicks() {
    alert('test');
  }

  loadProducts() {
    this.service
      .getProducts()
      .subscribe((data: Product[]) => {
        this.proucts = data;
        console.log('Data requested ... ');
        console.log(this.proucts);
      });
  }

  editProduct(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteProduct(id) {
    this.service.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }


  sortDate() {

    this.service
      .getProducts(this.isSort)
      .subscribe((data: Product[]) => {
        this.proucts = data;
        console.log('Data requested ... ');
        console.log(this.proucts);
      });

    if (this.isSort === 1) {
      this.isSort = 0;
      }
      else {
      this.isSort = 1;
      }

  }

}
