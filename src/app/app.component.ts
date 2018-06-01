import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Now Playing';
  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    if (typeof(Storage) !== undefined) {
      console.log('Code for localStorage/sessionStorage.');
      if (localStorage.getItem('cIdUser') !== null) {
        this.router.navigate([localStorage.getItem('cCurrentPath')]);
      } else {
        this.router.navigate(['login']);
      }
    } else {
      console.log('Sorry! No Web Storage support..');
    }
 }
}
