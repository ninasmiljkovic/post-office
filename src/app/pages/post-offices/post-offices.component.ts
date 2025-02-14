import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PostOfficeService} from '../../services/post-office.service';
import { PostOffice } from '../../../../../shared/postoffice.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-offices',
  standalone: false,
  templateUrl: './post-offices.component.html',
  styleUrl: './post-offices.component.scss'
})
export class PostOfficesComponent implements OnInit {
  postOfficeForm!: FormGroup;
  postOffices: PostOffice[] = [];
  displayedColumns: string[] = ["zipCode", "actions"];

  constructor(
    private fb: FormBuilder,
    private postOfficeService: PostOfficeService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.postOfficeForm = this.fb.group({
      zipCode: [''],
    });
    this.fetchPostOffices();

  }

  submitForm() {
    this.postOfficeService.createPostOffice(this.postOfficeForm.value)
        .subscribe( () => {
          this.fetchPostOffices()
        });
  }

  fetchPostOffices() {
    this.postOfficeService.getPostOffices().subscribe((data) => this.postOffices = data);
  }

  editPostOffice(id: string) {
    this.router.navigate([`/postoffices/${id}`]); }

  deletePostOffice(id: string) {
    this.postOfficeService.deletePostOffice(id).subscribe(
      () => this.fetchPostOffices()
    );
  }

}
