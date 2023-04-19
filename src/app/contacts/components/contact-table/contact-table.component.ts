import { Component } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../modals/contacts';


@Component({
    selector: 'contact-table',
    templateUrl: './contact-table.component.html',
    styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent {

    public contacts$ = this.contactsService.contacts$;

    public readonly displayedColumns: Array<string> = ['id', 'name', 'email', 'phone', 'comment', 'favorite', 'actions'];

    constructor(private contactsService: ContactsService) {}

    removeContact(id: number) {
        this.contactsService.deleteContact(id).subscribe();
    }

    favoriteContact(contact: Contact) {
        this.contactsService.favoriteContact(contact).subscribe();
    }
}
