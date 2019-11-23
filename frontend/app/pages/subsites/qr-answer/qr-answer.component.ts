import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {SimpleOrderData} from './SimpleOrderData';
import {map, switchMap} from 'rxjs/operators';
import {FunctionsService} from '../../../core/firebase/functions.service';

@Component({
  selector: 'app-qr-answer',
  templateUrl: './qr-answer.component.html',
  styleUrls: ['./qr-answer.component.scss']
})
export class QrAnswerComponent implements OnInit, OnDestroy {
  orderData: SimpleOrderData;
  $orderData: Observable<SimpleOrderData>;
  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private functionsServ: FunctionsService) {
  }

  ngOnInit() {
    this.$orderData = this.route.params.pipe(switchMap((params => this.functionsServ.checkQr(params.id))));
    this.sub = this.$orderData.subscribe(value => this.orderData = value);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  async getOrderData(id: string) {

  }


}
