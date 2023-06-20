import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleTwoComponent } from './example-two.component';
import { ParentComponent } from '../parent/parent.component';

describe('ExampleTwoComponent', () => {
  let component: ExampleTwoComponent;
  let fixture: ComponentFixture<ExampleTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleTwoComponent, ParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
