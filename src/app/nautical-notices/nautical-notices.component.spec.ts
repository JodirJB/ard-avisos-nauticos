import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NauticalNoticesComponent } from './nautical-notices.component';

describe('NauticalNoticesComponent', () => {
  let component: NauticalNoticesComponent;
  let fixture: ComponentFixture<NauticalNoticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NauticalNoticesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NauticalNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
