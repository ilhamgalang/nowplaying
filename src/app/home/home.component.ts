import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ListApiService } from '../service/list-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private api: ListApiService) {
  }

  ngOnInit() {
  }

}
