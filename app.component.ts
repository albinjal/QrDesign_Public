import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {ContactComponent} from './pages/subsites/contact/contact.component';
// import {GlobalvarsService} from './shared/globalvars.service';
// import {CompanyquestionComponent} from './shared/utility/companyquestion/companyquestion.component';

declare var gtag;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // comp: boolean;
  constructor(private router: Router, private dia: MatDialog, private snackbar: MatSnackBar
              // , private glob: GlobalvarsService
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // window.scroll(0, 0);
      // ^^Mayby
      gtag('config', 'UA-134937282-1', {
        'page_path': event.urlAfterRedirects
      });
    });
  }

  ngOnInit() {
    // if (this.glob.Company === null) {
    //   this.dia.open(CompanyquestionComponent, {minWidth: 400})
    //     .afterClosed().subscribe(result => {
    //     this.glob.setCompany(result);
    //     this.comp = result;
    //   });
    // }
    // this.comp = this.glob.Company;
  }

  contact(): void {
    this.dia.open(ContactComponent, {minWidth: 400, maxHeight: 730});
  }
}
