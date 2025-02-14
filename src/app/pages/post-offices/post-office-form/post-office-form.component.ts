import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PostOfficeService} from '../../../services/post-office.service';
import { PostOffice } from '../../../types/postoffice.model';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-post-office-form',
  templateUrl: './post-office-form.component.html',
  styleUrl: './post-office-form.component.scss',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ]
})
export class PostOfficeFormComponent implements OnInit {
  postOfficeForm!: FormGroup;
  postOfficeId!: string | null;
  originalPostOffice: PostOffice | null = null;

  constructor(
    private fb: FormBuilder,
    private postOfficeService: PostOfficeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.postOfficeForm = this.fb.group({
      zipCode: [''],
    });

    this.postOfficeId = this.route.snapshot.paramMap.get('id');
      this.postOfficeService.getPostOfficeById(this.postOfficeId!).subscribe({
        next: (postOffice: PostOffice) => {
          this.originalPostOffice = postOffice;
          this.postOfficeForm.patchValue(postOffice);
        },
        error: (err) => {
          console.error('Failed to fetch post office:', err);
          this.router.navigate(['/postoffices']);
        },
      });
  }

  submitForm() {
    if (this.originalPostOffice!.zipCode === this.postOfficeForm.value.zipCode) {
      console.log('No changes detected.');
      return; // prevent request if no changes
    } else {
      this.postOfficeService.updatePostOffice(this.postOfficeId!, this.postOfficeForm.value).subscribe(
        () => this.router.navigate(['/postoffices'])
      );
    }
  }
}
