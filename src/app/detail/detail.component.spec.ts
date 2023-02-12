import { ComponentFixture, TestBed } from '@angular/core/testing';

import { detailComponent } from './detail.component';

describe('detailComponent', () => {
  let component: detailComponent;
  let fixture: ComponentFixture<detailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ detailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(detailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
