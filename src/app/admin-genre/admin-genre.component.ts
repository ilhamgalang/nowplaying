import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ListApiService } from '../service/list-api.service';
import { AlertPopupService } from '../service/alert-popup.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-admin-genre',
  templateUrl: './admin-genre.component.html',
  styleUrls: ['./admin-genre.component.scss']
})
export class AdminGenreComponent implements OnInit {

  dataGenreAll: Object;
  addForm: FormGroup;
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ListApiService,
    private alertPopup: AlertPopupService
  ) { }

  ngOnInit() {
    this.getDataGenre();
    this.addForm = this.fb.group({
      genre: ['', Validators.required]
    });
    this.editForm = this.fb.group({
      genre: ['', Validators.required]
    });
  }

  getDataGenre() {
    this.api.getData('genre').subscribe(data => {
      this.dataGenreAll = data;
    });
  }

  deleteDataGenre(id: string) {
    this.api.deleteData('genre', id).subscribe(data => {
      this.alertPopup.alertMessage('success', data['message']);
    });
    setTimeout(() => { this.getDataGenre(); } , 500);
  }

  cekDeleteDataGenre(id: string) {
    swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.deleteDataGenre(id);
      }
    });
  }

 addDataGenre() {
    this.api.postData('genre', this.addForm.value).subscribe(data => {
      if (data['status'] === 1) {
        this.addForm.reset();
        this.alertMessage('success', data['message']);
        this.getDataGenre();
      } else {
        this.alertMessage('error', data['message']);
      }
    });
  }

  alertMessage(mtype: any, mtitle: any) {
    this.alertPopup.alertMessage(mtype, mtitle);
  }

  alertMessageNull(mtype: any, mtitle: any) {
    this.alertPopup.alertMessageNull(mtype, mtitle);
  }

}
