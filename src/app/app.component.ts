import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Now Playing';
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.cookieService.check('cIdUser')) {
      this.router.navigate([this.cookieService.get('cCurrentPath')]);
    } else {
      this.router.navigate(['login']);
    }
  }
}
