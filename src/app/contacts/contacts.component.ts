import { Platform } from '@angular/cdk/platform';
import { AfterContentInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ContactTableComponent } from './components/contact-table/contact-table.component';
import { ContactCardsComponent } from './components/contact-cards/contact-cards.component';

@Component({
    selector: 'contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements AfterContentInit {

    @ViewChild('contactsContainer', { static: true, read: ViewContainerRef }) contactsContainer!: ViewContainerRef;

    constructor( public platform: Platform ) {}

    ngAfterContentInit(): void {
        const isMobile = this.platform.ANDROID || this.platform.IOS;
        this.contactsContainer.createComponent<ContactCardsComponent | ContactTableComponent>(isMobile ? ContactCardsComponent : ContactTableComponent);
    }
}
