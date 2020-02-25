import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Product} from '../shared/product.model';
import {GlobalvarsService} from '../../../shared/globalvars.service';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.scss']
})
export class PricelistComponent implements OnInit {
  columnsToDisplay = ['name', 'nomomsprice'];
  canvasdata = Object.values(this.product.types.canvas.dimensions).sort((a, b) => {
    return a.price >= b.price ? 1 : -1;
  });
  posterdata = Object.values(this.product.types.poster.dimensions).sort((a, b) => {
    return a.price >= b.price ? 1 : -1;
  });

  moms = true;
  constructor(public dialogRef: MatDialogRef<PricelistComponent>,
              @Inject(MAT_DIALOG_DATA) public product: Product,
              public globs: GlobalvarsService) {
  }

  ngOnInit() {
    this.moms = this.globs.Moms;
  }

}
