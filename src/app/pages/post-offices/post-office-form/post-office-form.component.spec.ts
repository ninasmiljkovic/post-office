import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOfficeFormComponent } from './post-office-form.component';

describe('PostOfficeFormComponent', () => {
  let component: PostOfficeFormComponent;
  let fixture: ComponentFixture<PostOfficeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostOfficeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostOfficeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
