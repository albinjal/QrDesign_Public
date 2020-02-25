import {Injectable, Type} from '@angular/core';
import {MailChimpMember} from './mail-chimp-member';
import {FunctionsService} from '../firebase/functions.service';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class MailChimpService {
  private gotPopup: boolean;
  private signedUp: boolean;

  constructor(
    private fs: FunctionsService,
    private cookie: CookieService,
    private dialog: MatDialog
  ) {
    this.gotPopup = this.cookie.check('mailchimp-popup');
    this.signedUp = this.cookie.check('mailchimp-signed-up');
  }


  async addMember(data: object) {
    /*
    this.fs.addMemberToMailchimp({

    });
    */
  }

  showPopUp(comp: Type<any>) {
    this.dialog.open(comp, {});
  }

}
