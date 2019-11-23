import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {ContactComponent} from './shared/utility/contact/contact.component';
import {GlobalvarsService} from './shared/globalvars.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FireAuthService} from './core/firebase/auth.service';
import {AngularFirePerformance} from '@angular/fire/performance';
// import {GlobalvarsService} from './shared/globalvars.service';
// import {CompanyquestionComponent} from './shared/utility/companyquestion/companyquestion.component';

declare var gtag;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // comp: boolean;
  constructor(private router: Router,
              private dia: MatDialog,
              private snackbar: MatSnackBar,
              private glob: GlobalvarsService,
              private authServ: FireAuthService,
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      window.scroll(0, 0);
      gtag('config', 'UA-134937282-1', {
        'page_path': event.urlAfterRedirects,
        'anonymize_ip': true
      });
    });

    authServ.anonymousLogin();
  }

  ngOnInit() {
    /*
    if (!this.glob.Cookiespol) {
      this.snackbar.open('Vi använder oss av kakor för att förbättra användarupplevelsen', 'OK')
        .onAction()
        .subscribe(value => this.glob.Cookiespol = true);
    }
     */
  }

  contact(): void {
    this.dia.open(ContactComponent, {minWidth: 300});
  }
}
