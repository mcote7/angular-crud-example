import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactTableComponent } from './components/contact-table/contact-table.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
    declarations: [
        ContactsComponent,
        ContactTableComponent,
        ContactFormComponent
    ],
    imports: [
        CommonModule,
        ContactsRoutingModule,
        ReactiveFormsModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
    ]
})
export class ContactsModule { }
