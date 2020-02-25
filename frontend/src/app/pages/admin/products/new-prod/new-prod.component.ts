import { Component, OnInit } from '@angular/core';
import {AdminProdService} from '../admin-prod.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import DateTimeFormat = Intl.DateTimeFormat;
import {NewProdForm} from './new-prod.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-prod',
  templateUrl: './new-prod.component.html',
  styleUrls: ['./new-prod.component.scss']
})
export class NewProdComponent {
  newProdForm: FormGroup;
  constructor(private prodServ: AdminProdService, private fb: FormBuilder, private snackbar: MatSnackBar) {
    this.setForm();
  }

  setForm() {
    this.newProdForm = this.fb.group({
      id: ['', Validators.required],
      popularity: [3, Validators.required],
      name: ['', Validators.required],
      visable: [false, Validators.required],
      favorite_color: [null, Validators.required],
      colors: this.fb.array([this.createColor()])
    });
  }

  get colors(): FormArray {
    return this.newProdForm.get('colors') as FormArray;
  }

  addColor() {
    this.colors.push(this.createColor());
  }

  createColor(): FormGroup {
    return this.fb.group({
      'col_id': ['', Validators.required],
      'col_name': ['', Validators.required],
      'canvas_img_url': ['', Validators.required],
      'poster_img_url': ['', Validators.required]
    });
  }

  get date() {
    return new Date().getTime();
  }

  submit() {
    const form: NewProdForm = this.newProdForm.value;
    let colors = {};
    form.colors.forEach(color => colors[color.col_id] = {
      name: color.col_name,
      savedas: color.col_id,
      imgpath: {
        canvas: color.canvas_img_url,
        poster: color.poster_img_url
      }
    });
    const product = {
      orientation: 'standning',
      favoritecolor: form.favorite_color,
      name: form.name,
      popularity: form.popularity,
      prodID: form.id,
      visable: form.visable,
      colors: colors
    };
    this.prodServ.setProduct(product.prodID, product).then(result => {
      this.newProdForm.reset();
      this.snackbar.open('Ny produkt skapades', 'awesome');
    })
      .catch(error => this.snackbar.open('något flippade i skapningen, checka consolen', 'ajdå'));

  }

}
