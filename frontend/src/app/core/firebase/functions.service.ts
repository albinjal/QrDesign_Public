import {Injectable} from '@angular/core';
import {AngularFireFunctions} from '@angular/fire/functions';
import {Observable} from 'rxjs';
import {SimpleOrderData} from '../../pages/subsites/qr-answer/SimpleOrderData';
import {User} from '../cart.model';
import {MailChimpMember} from '../mailchimp/mail-chimp-member';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  private checkfn = this.aff.httpsCallable('checkCode');
  private checkQrMissing = this.aff.httpsCallable('checkForQrMissing');
  private calcDel = this.aff.httpsCallable('calcDelivery');
  private addToChimp = this.aff.httpsCallable('addToChimp');

  constructor(private aff: AngularFireFunctions) {
  }

  checkDiscount(code: string): Promise<number> {
    return this.checkfn({
      code: code
    }).toPromise();
  }

  checkQr(id: string): Promise<SimpleOrderData> {
    return this.checkQrMissing({id: id}).toPromise();
  }

  calculateDelivery(user: User): Promise<number> {
    return this.calcDel({items: user.cart}).toPromise();
  }

  async addMemberToMailchimp(member: MailChimpMember) {
    return this.addToChimp(member).toPromise();
  }
}
