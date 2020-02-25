import {Component, OnInit} from '@angular/core';
import {FirestoreService} from '../../../core/firebase/store.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faq$: Observable<Faq> = this.fss.get('Admin', 'Faq');

  constructor(private fss: FirestoreService<Faq>) {
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
