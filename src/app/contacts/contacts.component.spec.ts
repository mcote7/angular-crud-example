import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactsComponent } from './contacts.component';
import { Platform } from '@angular/cdk/platform';
import { ContactCardsComponent } from './components/contact-cards/contact-cards.component';
import { ContactTableComponent } from './components/contact-table/contact-table.component';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

// Mocking the Platform class
class MockPlatform {
    ANDROID = false;
    IOS = false;
}

describe('ContactsComponent', () => {
    let component: ContactsComponent;
    let fixture: ComponentFixture<ContactsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientModule, MatDialogModule, BrowserAnimationsModule, MatTableModule],
            declarations: [ContactsComponent, ContactCardsComponent, ContactTableComponent],
            providers: [{ provide: Platform, useClass: MockPlatform }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactsComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should create ContactCardsComponent if the platform is mobile', () => {
        const platform = TestBed.inject(Platform);
        platform.ANDROID = true; // Set platform to Android for this test (is mobile)
        platform.IOS = false;

        fixture.detectChanges();
        const contactCardsComponent = fixture.debugElement.query(By.directive(ContactCardsComponent));
        const contactTableComponent = fixture.debugElement.query(By.directive(ContactTableComponent));

        expect(contactCardsComponent).toBeTruthy();
        expect(contactTableComponent).toBeFalsy();
    });

    it('should create ContactTableComponent if the platform is not mobile', () => {
        const platform = TestBed.inject(Platform);
        platform.IOS = false;
        platform.ANDROID = false;

        fixture.detectChanges();
        const contactCardsComponent = fixture.debugElement.query(By.directive(ContactCardsComponent));
        const contactTableComponent = fixture.debugElement.query(By.directive(ContactTableComponent));

        expect(contactCardsComponent).toBeFalsy();
        expect(contactTableComponent).toBeTruthy();
    });
});
