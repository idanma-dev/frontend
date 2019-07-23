import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  
  constructor(private service: ProductService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      Name: ['', Validators.required],
      Description: '',
      Amount: ['', Validators.max(999999)],
      strDate: '',
      IsPrivate: ''
    });
  }

  addProduct(Name, Description, Amount, strDate, IsPrivate) {

    this.service.addProduct(Name, Description, Amount, strDate, IsPrivate).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  ngOnInit() {
  }

}
