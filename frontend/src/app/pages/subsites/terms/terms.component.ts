import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              @Inject(DOCUMENT) document) {
  }

  ngOnInit() {
    this.route.fragment.subscribe(value => document.getElementById(value).
      style.cssText = 'background-color: orange;');
  }

}
