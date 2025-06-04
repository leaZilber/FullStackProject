import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoralManageComponent } from './poral-manage.component';

describe('PoralManageComponent', () => {
  let component: PoralManageComponent;
  let fixture: ComponentFixture<PoralManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoralManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoralManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
