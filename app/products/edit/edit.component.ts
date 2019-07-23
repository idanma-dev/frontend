import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, MaxLengthValidator } from '@angular/forms';
import { ProductService } from 'src/app/shared/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: string;
  product: any = {};
  updateForm;


  constructor(private service: ProductService, private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private fb: FormBuilder) {

    this.createForm();
  }

  ngOnInit() {
    this.createFormGroup();
  }

  createFormGroup() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.service.getProductById(this.id).subscribe(res => {
        this.product = res;
        if (!isNullOrUndefined(this.product.strDate)) {
          this.product.strDate = this.getEnDate(this.product.strDate);
        }
        this.updateForm.get('Name').setValue(this.product.Name);
        this.updateForm.get('Description').setValue(this.product.Description);
        this.updateForm.get('Amount').setValue(this.product.Amount);
        this.updateForm.get('strDate').setValue(new Date(this.product.strDate));
        this.updateForm.get('IsPrivate').setValue(this.product.IsPrivate);

      });
    });

  }

  createForm() {
    this.updateForm = this.fb.group({
      Name: ['', Validators.required],
      Description: '',
      Amount: ['', Validators.max(999999)],
      strDate: '',
      IsPrivate: false
    });

  }

  getEnDate(str) {

    return str.split('/')[1] + '/' +
      str.split('/')[0] + '/' + str.split('/')[2];

  }

  updateProduct(Name, Description, Amount, strDate, IsPrivate) {

    this.service.updateProduct(this.id, Name, Description, Amount, strDate, IsPrivate).subscribe(() => {
      this.snackBar.open('Product updated successfully', 'OK', {
        duration: 3000,
      });
    });
  }

}
