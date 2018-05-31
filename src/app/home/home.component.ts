import { Component, OnInit } from '@angular/core';
import { ListApiService } from '../list-api/list-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private listApiService: ListApiService) {
  }

  ngOnInit() {
  }

}
