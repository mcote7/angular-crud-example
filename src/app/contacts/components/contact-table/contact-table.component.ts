import { Component } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../modals/contacts';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { listAnimationWrap, listAnimationItem, fadeIn } from 'src/app/animations/animations';


@Component({
    selector: 'contact-table',
    templateUrl: './contact-table.component.html',
    styleUrls: ['./contact-table.component.scss'],
    animations: [listAnimationWrap, listAnimationItem, fadeIn]
})
export class ContactTableComponent {

    public contacts$ = this.contactsService.contacts$;
    public readonly displayedColumns: Array<string> = ['id', 'name', 'email', 'phone', 'comment', 'favorite', 'actions'];
    public isTableAnimationDone: boolean = false;

    constructor(private contactsService: ContactsService, private dialog: MatDialog) {}

    removeContact(id: number) {
        this.contactsService.deleteContact(id).subscribe();
    }

    favoriteContact(contact: Contact) {
        this.contactsService.favoriteContact(contact).subscribe();
    }

    openContactForm(contactToEdit?: Contact) {
        if(contactToEdit) {
            const dialogConfig = new MatDialogConfig<Contact>();
            dialogConfig.data = {
                id: contactToEdit.id,
                name: contactToEdit.name,
                email: contactToEdit.email,
                phone: contactToEdit.phone,
                comment: contactToEdit.comment,
                favorite: contactToEdit.favorite
            };
            this.dialog.open(ContactFormComponent, dialogConfig);
        } else {
            this.dialog.open(ContactFormComponent);
        }
    }

    tableAnimationDone(e:any) { e.toState !== 0 ? this.isTableAnimationDone = true : null }
}
