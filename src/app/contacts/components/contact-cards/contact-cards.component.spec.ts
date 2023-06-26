import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCardsComponent } from './contact-cards.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

describe('ContactCardsComponent', () => {
  let component: ContactCardsComponent;
  let fixture: ComponentFixture<ContactCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [HttpClientModule, MatDialogModule],
      declarations: [ ContactCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
