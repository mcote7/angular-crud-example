import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../modals/contacts';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


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

    public contactToEditId: number = 0;
    public isEdit: boolean = false;

    constructor(
        private fb: FormBuilder, 
        private contactsService: ContactsService,
        private dialogRef: MatDialogRef<ContactFormComponent>,
        @Inject(MAT_DIALOG_DATA) data: Contact
    ) {
        if(data) {
            // console.log("contact to edit", data, this.contactForm)
            this.isEdit = true;
            this.contactToEditId = data.id || 0;
            this.contactForm.patchValue({
                name: data.name,
                email: data.email,
                phone: data.phone,
                comment: data.comment
            });
        }
    }

    addContact() {
        this.contactsService.postContact(this.contactForm.value).subscribe();
        this.contactForm.reset();
    }

    editContact() {
        this.contactsService.editContact(this.contactToEditId, this.contactForm.value).subscribe();
        this.close();
    }

    close() {
        this.dialogRef.close();
    }
}
