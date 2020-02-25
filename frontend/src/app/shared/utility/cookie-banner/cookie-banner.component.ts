import { Component, OnInit } from '@angular/core';
import {MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss']
})
export class CookieBannerComponent implements OnInit {

  constructor(public snackBarRef: MatSnackBarRef<CookieBannerComponent>) { }

  ngOnInit() {
  }

}
