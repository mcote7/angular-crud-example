import { Component } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Contact } from '../../modals/contacts';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
    selector: 'contact-cards',
    templateUrl: './contact-cards.component.html',
    styleUrls: ['./contact-cards.component.scss']
})
export class ContactCardsComponent {
    public contacts$ = this.contactsService.contacts$;
    
    constructor(
        private contactsService: ContactsService,
        private dialog: MatDialog
    ) {}

    removeContact(id: number) {
        this.contactsService.deleteContact(id).subscribe();
    }

    favoriteContact(contact: Contact) {
        this.contactsService.favoriteContact(contact).subscribe();
    }

    openContactForm(contactToEdit?: Contact) {
        if (contactToEdit) {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
                id: contactToEdit.id,
                name: contactToEdit.name,
                email: contactToEdit.email,
                phone: contactToEdit.phone,
                comment: contactToEdit.comment
            };
            this.dialog.open(ContactFormComponent, dialogConfig);
        } else {
            this.dialog.open(ContactFormComponent);
        }
    }
}
