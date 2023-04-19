import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../modals/contacts';


@Component({
    selector: 'contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {

    public contactForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^(\\+?\d{1,4}[\s-])?(?!0+\s+,?$)\\d{10}\s*,?$')]],
        comment: ''
    });

    constructor(private fb: FormBuilder, private contactsService: ContactsService) { }

    addContact() {
        this.contactsService.postContact(this.contactForm.value).subscribe();
        this.contactForm.reset();
    }

    // editContact(contact: Contact) {
    //     this.contactsService.editContact(contact, this.contactForm.value).subscribe();
    //     // close modal ... 
    // }
}
