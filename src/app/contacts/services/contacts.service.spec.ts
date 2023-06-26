import { TestBed } from '@angular/core/testing';

import { ContactsService } from './contacts.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('ContactsService', () => {
    let service: ContactsService;
    let testingController: HttpTestingController;
    const data = [
        {
            "name": "Michael Cote",
            "email": "michaelcote7@gmail.com",
            "phone": "2063756709",
            "comment": null,
            "id": 1,
            "favorite": true
        },
        {
            "name": "Michael Cote",
            "email": "michaelcote7@gmail.com",
            "phone": "2222222222",
            "comment": "",
            "id": 2,
            "favorite": false
        },
        {
            "name": "ok",
            "email": "michaelcote7@gmail.com",
            "phone": "8888888888",
            "comment": "",
            "id": 3,
            "favorite": false
        }
    ]

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [ContactsService] });
        service = TestBed.inject(ContactsService);
        testingController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all contacts', () => {
        service.getContacts().subscribe((res) => {
            console.log("http get test res: ",res)
            expect(res).toBeTruthy();
            expect(res.length).toBe(3);
        });
        const mockReq = testingController.match('contacts_list');
        // mockReq.flush(data); // called 2ice due to proxy ... 
        // mockReq[0].flush(data);
        // mockReq[1].flush(data); 
        mockReq.forEach((req) => req.flush(data));
    })
});
