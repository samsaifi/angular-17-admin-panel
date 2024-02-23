import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutblankComponent } from './layoutblank.component';

describe('LayoutblankComponent', () => {
  let component: LayoutblankComponent;
  let fixture: ComponentFixture<LayoutblankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutblankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutblankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
