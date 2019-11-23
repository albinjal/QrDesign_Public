import {Component, OnInit} from '@angular/core';
import {FirestoreService} from '../../../core/firebase/store.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faq: Faq;

  constructor(fss: FirestoreService<Faq>) {
    fss.get('Admin', 'Faq').subscribe(
      value => this.faq = value
    );
  }

  ngOnInit() {
  }

}

export interface Faq {
  questions: Array<Questions>;
}

export interface Questions {
  question: string;
  answer: string;
}
