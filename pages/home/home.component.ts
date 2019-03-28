import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ContactComponent} from '../subsites/contact/contact.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  test;

  constructor(private dia: MatDialog) {
  }

  ngOnInit() {
  }

  open() {
    this.dia.open(ContactComponent, {maxHeight: 730});
  }
}
