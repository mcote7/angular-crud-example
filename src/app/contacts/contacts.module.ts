import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactTableComponent } from './components/contact-table/contact-table.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

import { MatExportsModule } from '../mat-exports/mat-exports.module';


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
        MatExportsModule
    ]
})
export class ContactsModule { }
