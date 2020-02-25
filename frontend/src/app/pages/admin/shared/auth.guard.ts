import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import {AdminService} from './admin.service';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private adminServ: AdminService, private router: Router) {}


  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (this.adminServ.authenticated) { return true; }
    return this.adminServ.adminUser$
      .pipe(
        take(1),
        map(value => !!value)
      )
      .toPromise()
      .then(loggedIn => {
        console.log(loggedIn);
        if (!loggedIn) {
          this.router.navigate(['/admin/login']);
        }
        return loggedIn;
      });
  }
}
