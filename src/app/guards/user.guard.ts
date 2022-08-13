import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HOME, LOGIN } from '../app.model';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      (route.routeConfig?.path == '') &&
      localStorage.getItem('isUserLoggedIn') == 'true'
    ) {
      return true;
    } else {
      this.router.navigate([LOGIN]);
      return false;
    }
  }
}
