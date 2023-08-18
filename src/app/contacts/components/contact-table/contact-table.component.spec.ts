import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTableComponent } from './contact-table.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

describe('ContactTableComponent', () => {
    let component: ContactTableComponent;
    let fixture: ComponentFixture<ContactTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientModule, MatDialogModule, BrowserAnimationsModule, MatTableModule],
            declarations: [ContactTableComponent],
            providers: [{
                provide: MatDialogRef,
                useValue: []
            }]
        }).compileComponents();
        fixture = TestBed.createComponent(ContactTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
