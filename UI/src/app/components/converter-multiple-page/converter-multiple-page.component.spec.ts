import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterMultiplePageComponent } from './converter-multiple-page.component';

describe('ConverterMultiplePageComponent', () => {
  let component: ConverterMultiplePageComponent;
  let fixture: ComponentFixture<ConverterMultiplePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConverterMultiplePageComponent]
    });
    fixture = TestBed.createComponent(ConverterMultiplePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
