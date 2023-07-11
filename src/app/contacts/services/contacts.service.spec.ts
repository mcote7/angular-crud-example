import { TestBed } from '@angular/core/testing';

import { ContactsService } from './contacts.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Contact } from '../modals/contacts';
import { BehaviorSubject } from 'rxjs';


describe('ContactsService', () => {
    let service: ContactsService;
    let httpMock: HttpTestingController;
    const apiUrl = 'contacts_list';

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [ContactsService] });
        service = TestBed.inject(ContactsService);
        httpMock = TestBed.inject(HttpTestingController);

        // need to flush initial res from service constructor GET ... 
        const mockReq = httpMock.expectOne(apiUrl);
        mockReq.flush({});
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // ❇️ get 
    it('should get all contacts', () => {
        const mockResponse: Contact[] = [
            {
                name: "Michael Cote",
                email: "michaelcote7@gmail.com",
                phone: "2063756709",
                comment: "",
                id: 1,
                favorite: true
            },
            {
                name: "Michael Cote",
                email: "michaelcote7@gmail.com",
                phone: "2222222222",
                comment: "",
                id: 2,
                favorite: false
            },
            {
                name: "ok",
                email: "michaelcote7@gmail.com",
                phone: "8888888888",
                comment: "",
                id: 3,
                favorite: false
            }
        ];
        spyOn(service['contacts'], 'next').and.callThrough();
        // 
        service.getContacts().subscribe((contacts) => {
            expect(contacts).toBeTruthy();
            expect(contacts.length).toBe(3);
            expect(contacts).toEqual(mockResponse);
            expect(service['contacts'].next).toHaveBeenCalledWith(mockResponse);
        });
        // 
        const mockReq = httpMock.expectOne(apiUrl);
        expect(mockReq.request.method).toBe('GET');
        mockReq.flush(mockResponse);
    });

    // ❇️ post
    it('should post a contact and update the contacts list', () => {
        const mockContact: Contact = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '1231231213',
            comment: '',
            id: 4,
            favorite: false
        };
        // Mock the response from the HTTP request
        const mockResponse: Contact = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '1231231213',
            comment: '',
            id: 4,
            favorite: false
        };
        // Use a BehaviorSubject to mock the contacts list
        const contactsList: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);
        spyOn(service['contacts'], 'next').and.callThrough();
        spyOn(service['contacts'], 'getValue').and.returnValue(contactsList.getValue());
        // Call the method under test
        service.postContact(mockContact).subscribe((result) => {
            expect(result).toEqual(mockResponse);
            expect(service['contacts'].next).toHaveBeenCalledWith([...contactsList.getValue(), mockResponse]);
        });
        // Verify the HTTP request
        const mockReq = httpMock.expectOne(apiUrl);
        expect(mockReq.request.method).toBe('POST');
        mockReq.flush(mockResponse);
    });

    // ❇️ delete
    it('should delete a contact and update the contacts list', () => {
        const contactId = 1;
        const mockResponse: Contact = {
            id: contactId,
            name: "Michael Cote",
            email: "michaelcote7@gmail.com",
            phone: "2063756709",
            comment: "",
            favorite: true
        };
        // Use a BehaviorSubject to mock the contacts list
        const contactsList: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([
            mockResponse,
            {
                name: "Michael Cote",
                email: "michaelcote7@gmail.com",
                phone: "2222222222",
                comment: "",
                id: 2,
                favorite: false
            },
            {
                name: "ok",
                email: "michaelcote7@gmail.com",
                phone: "8888888888",
                comment: "",
                id: 3,
                favorite: false
            }
        ]);
        spyOn(service['contacts'], 'next').and.callThrough();
        spyOn(service['contacts'], 'getValue').and.returnValue(contactsList.getValue());
        // Call the method under test
        service.deleteContact(contactId).subscribe((result) => {
            expect(result).toEqual(mockResponse);
            expect(service['contacts'].next).toHaveBeenCalledWith([...contactsList.getValue().filter((contact) => contact.id !== contactId)]);
        });
        // Verify the HTTP request
        const mockReq = httpMock.expectOne(`${apiUrl}/${contactId}`);
        expect(mockReq.request.method).toBe('DELETE');
        mockReq.flush(mockResponse);
    });

    // ❇️ fav
    it('should toggle the favorite status of a contact', () => {
        const contact: Contact = {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: "8888888888",
            comment: "",
            favorite: false,
            // Add other properties as needed
        };
        const updatedContact: Contact = {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: "8888888888",
            comment: "",
            favorite: true,
            // Add other properties as needed
        };
        // Call the method under test
        service.favoriteContact(contact).subscribe((result) => {
            expect(result).toEqual(updatedContact);
            expect(contact.favorite).toBe(updatedContact.favorite);
        });
        // Verify the HTTP request
        const mockReq = httpMock.expectOne(`${apiUrl}/${contact.id}`);
        expect(mockReq.request.method).toBe('PATCH');
        expect(mockReq.request.body).toEqual({ favorite: !contact.favorite });
        mockReq.flush(updatedContact);
    });

    // edit
    it('should edit a contact and update the contacts list', () => {
        const contactId = 1;
        const editedContact: Contact = {
            name: 'Updated Name',
            email: 'updatedemail@example.com',
            phone: "8888888888",
            comment: "",
            favorite: false
        };
        const mockResponse: Contact = {
            id: contactId,
            name: 'Updated Name',
            email: 'updatedemail@example.com',
            phone: "8888888888",
            comment: "",
            favorite: false
        };
        // Use a BehaviorSubject to mock the contacts list
        const contactsList: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([
            {
                id: contactId,
                name: 'Old Name',
                email: 'oldemail@example.com',
                favorite: false,
                phone: "8888888888",
                comment: ""
            },
            {
                name: "ok",
                email: "michaelcote7@gmail.com",
                phone: "8888888888",
                comment: "",
                id: 2,
                favorite: false
            }
        ]);
        spyOn(service['contacts'], 'next').and.callThrough();
        spyOn(service['contacts'], 'getValue').and.returnValue(contactsList.getValue());
        // Call the method under test
        service.editContact(contactId, editedContact).subscribe((result) => {
            expect(result).toEqual(mockResponse);
            const updatedContacts = contactsList.getValue().map((contact) => {
                if (contact.id === contactId) {
                    return {
                        ...mockResponse,
                        favorite: contact.favorite
                    };
                } else {
                    return contact;
                }
            });
            expect(service['contacts'].next).toHaveBeenCalledWith([...updatedContacts]);
        });
        // Verify the HTTP request
        const mockReq = httpMock.expectOne(`${apiUrl}/${contactId}`);
        expect(mockReq.request.method).toBe('PUT');
        expect(mockReq.request.body).toEqual(editedContact);
        mockReq.flush(mockResponse);
    });
});
