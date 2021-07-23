import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogLocalComponent } from './blog-local.component';

describe('BlogLocalComponent', () => {
  let component: BlogLocalComponent;
  let fixture: ComponentFixture<BlogLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
