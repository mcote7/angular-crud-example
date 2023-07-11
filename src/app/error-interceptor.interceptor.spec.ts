import { TestBed } from '@angular/core/testing';

import { ErrorInterceptor } from './error-interceptor.interceptor';
import { ContactsService } from './contacts/services/contacts.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


describe('ErrorInterceptor', () => {
    let service: ContactsService;
    let httpMock: HttpTestingController;
    let interceptor: ErrorInterceptor;
    let http: HttpClient;
    const apiUrl = 'contacts_list';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HttpClient,
                ContactsService,
                ErrorInterceptor,
                { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
            ]
        });
        service = TestBed.inject(ContactsService);
        httpMock = TestBed.inject(HttpTestingController);
        interceptor = TestBed.inject(ErrorInterceptor);
        http = TestBed.inject(HttpClient);
        // need to flush initial res from service constructor GET ... 
        const mockReq = httpMock.expectOne(apiUrl);
        mockReq.flush({});
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
        expect(interceptor).toBeTruthy();
    });

    // 
    it('should throw error if http error is intercepted', () => {
        // const message = 'Something went wrong';
        const status = 404;
        // make http request, create error, check if intercepted ... 
        // const err = new Error('test');
        // service.getContacts().subscribe(
        //     () => fail("error"),
        // );
        http.get("fakeCall").subscribe(
            () => fail("should have failed with 404"),
            (error) => {
                expect(error.status).toEqual(status);
            }
        );
        // 
        const mockReq = httpMock.expectOne("fakeCall");
        // mockReq.error(new ProgressEvent("error?"));
        const spy = spyOn(interceptor, "intercept");
        expect(spy).toHaveBeenCalled();
        // expect(mockReq.request.method).toBe('GET');
        mockReq.flush({});
        // mockReq.flush("", { status: 404, statusText: "Not Found" });
    });
});
