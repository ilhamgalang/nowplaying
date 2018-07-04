import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ListApiService } from '../service/list-api.service';
import { DataUserService } from '../service/data-user.service';
import { AlertPopupService } from '../service/alert-popup.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  dataUserAll: Object;
  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataUserService: DataUserService,
    private api: ListApiService,
    private alertPopup: AlertPopupService
  ) { }

  ngOnInit() {
    this.getDataUser();
    this.addForm = this.fb.group({
      genre: ['', Validators.required]
    });
  }

  getDataUser() {
    this.api.getData('user').subscribe(data => {
      this.dataUserAll = data;
    });
  }

  deleteDataUser(id: string) {
    this.api.deleteData('user', id).subscribe(data => {
      this.alertPopup.alertMessage('success', data['message']);
    });
    setTimeout(() => { this.getDataUser(); } , 500);
  }

  addData() {
    this.api.postUser(this.addForm.value).subscribe(data => {
      if (data['status'] === 1) {
        this.alertPopup.alertMessage('succes', data['message']);
      } else {
        this.alertPopup.alertMessage('error', data['message']);
      }
    });
  }

}

