import { Component } from '@angular/core';
import { ContactsService } from './services/contacts.service';


@Component({
    selector: 'contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

    public contacts$ = this.contactsService.contacts$;

    constructor(private contactsService: ContactsService) {}
}
