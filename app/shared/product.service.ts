import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  uri = 'http://localhost:49504/api';
  strDate: Date;
  constructor(private http: HttpClient) {
  }

  getProducts(sort?: number) {

    if (sort != 1) {
    return this.http.get(`${this.uri}/product`);
    } else {
    return this.http.get(`${this.uri}/product?sort=1`);
    }

  }

  getProductById(id) {
    return this.http.get(`${this.uri}/product/${id}`);
  }

  addProduct(Name, Description, Amount, StrDate, IsPrivate) {

    const product = {
      name: Name,
      description: Description,
      amount: Amount,
      strDate: StrDate,
      isPrivate: IsPrivate
    };
    return this.http.post(`${this.uri}/product`, product);
  }
  updateProduct(id, name, description, amount, date, isPrivate) {


    const product = {
      ID: id,
      Name: name,
      Description: description,
      Amount: amount,
      IsPrivate: isPrivate,
      strDate : date
    };

    return this.http.put(`${this.uri}/product/${id}`, product);
  }
  deleteProduct(id) {
    return this.http.delete(`${this.uri}/product/${id}`);
  }

}
