import {Component, OnInit, TemplateRef} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {ContactComponent} from './shared/utility/contact/contact.component';
import {GlobalvarsService} from './shared/globalvars.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FireAuthService} from './core/firebase/auth.service';
import {AngularFirePerformance} from '@angular/fire/performance';
import {AnalyticsService} from './core/analytics/analytics.service';
import {CookieBannerComponent} from './shared/utility/cookie-banner/cookie-banner.component';
import {MailChimpService} from './core/mailchimp/mailchimp.service';
import {MailSignupComponent} from './shared/utility/mail-signup/mail-signup.component';
// import {GlobalvarsService} from './shared/globalvars.service';
// import {CompanyquestionComponent} from './shared/utility/companyquestion/companyquestion.component';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router,
              private glob: GlobalvarsService,
              private authServ: FireAuthService,
              private _analytics: AnalyticsService,
              private snackbar: MatSnackBar,
              private chimpService: MailChimpService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this._analytics.pageView();
      }
    });
    this.authServ.anonymousLogin();
  }

  ngOnInit() {
    if (!this.glob.Cookiespol) {
      this.snackbar.openFromComponent(CookieBannerComponent, {})
        .onAction()
        .subscribe(value => this.glob.Cookiespol = true);
    }
    setTimeout(() => this.chimpService.showPopUp(MailSignupComponent), 500);
  }
}
