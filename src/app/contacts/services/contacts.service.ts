import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Contact } from '../modals/contacts';


@Injectable({
    providedIn: 'root'
})
export class ContactsService {

    private contacts = new BehaviorSubject<Array<Contact>>([]);
    public contacts$ = this.contacts.asObservable();

    constructor(private http: HttpClient) {
        this.getContacts().subscribe();
    }

    private getContacts() {
        return this.http.get<Array<Contact>>('contacts_list')
            .pipe(
                tap((contacts) => this.contacts.next(contacts))
            );
    }

    // post, patch, delete ... 
}
