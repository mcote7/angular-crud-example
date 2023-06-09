import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Contact } from '../modals/contacts';


@Injectable({
    providedIn: 'root'
})
export class ContactsService {

    private readonly API_URL = "contacts_list";

    private contacts = new BehaviorSubject<Array<Contact>>([]);
    public contacts$ = this.contacts.asObservable();


    constructor(private http: HttpClient) {
        this.getContacts().subscribe();
    }

    // TODO: add loading state ... 

    public getContacts(): Observable<Array<Contact>> {
        return this.http.get<Array<Contact>>(this.API_URL)
            .pipe(
                tap((contacts) => this.contacts.next(contacts))
            );
    }

    public postContact(contact: Contact): Observable<Contact> {
        return this.http.post<Contact>(this.API_URL, contact)
            .pipe(
                tap((newContact) => this.contacts.next([...this.contacts.getValue(), newContact]))
            );
    }

    public deleteContact(contactId: number): Observable<Contact> {
        return this.http.delete<Contact>(`${this.API_URL}/${contactId}`)
            .pipe(
                tap((_) => this.contacts.next([...this.contacts.getValue().filter((contact) => contact.id !== contactId)]))
            );
    }

    public favoriteContact(contact: Contact): Observable<Contact> {
        return this.http.patch<Contact>(`${this.API_URL}/${contact.id}`, { favorite: !contact.favorite })
            .pipe(
                tap((updatedContact) => contact.favorite = updatedContact.favorite)
            );
    }

    public editContact(contactId: number, editedContact: any): Observable<Contact> {
        return this.http.put<Contact>(`${this.API_URL}/${contactId}`, editedContact)
            .pipe(
                tap((updatedContact) => {
                    const updatedContacts = this.contacts.getValue().map((contact) => {
                        if(contact.id === contactId) {
                            return {
                                ...updatedContact,
                                favorite: contact.favorite
                            };
                        } else {
                            return contact;
                        }
                    });
                    this.contacts.next([...updatedContacts]);
                })
            );
    }
}
