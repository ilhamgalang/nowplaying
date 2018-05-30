import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Now Playing';
  public currentPath;
  constructor(private _router: Router ) {
    this.currentPath = _router;
  }
}
