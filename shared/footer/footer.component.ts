import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  links = [
    {name: 'Butik', link: 'butik'},
    {name: 'Om Oss', link: 'information'},
    {name: 'Kontakt', link: 'kontakt'},
    {name: 'Till Kassan', link: 'kassa'}];
  ngOnInit() {
  }
}
