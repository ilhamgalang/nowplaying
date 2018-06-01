import { Component, OnInit } from '@angular/core';
import { ListApiService } from '../service/list-api.service';
import { DataUserService } from '../service/data-user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  dataUserAll: Object;

  constructor(
    private dataUserService: DataUserService,
    private api: ListApiService
  ) { }

  ngOnInit() {
    this.api.getUser().subscribe(data => {
      this.dataUserAll = data;
    });
  }

}
