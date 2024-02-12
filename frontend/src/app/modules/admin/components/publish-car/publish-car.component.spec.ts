import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishCarComponent } from './publish-car.component';

describe('PublishCarComponent', () => {
  let component: PublishCarComponent;
  let fixture: ComponentFixture<PublishCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishCarComponent]
    });
    fixture = TestBed.createComponent(PublishCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
