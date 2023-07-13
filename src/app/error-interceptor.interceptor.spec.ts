import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ErrorInterceptor } from './error-interceptor.interceptor';


describe('ErrorInterceptor', () => {
    let http: HttpClient;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HttpClient,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ErrorInterceptor,
                    multi: true,
                },
            ],
        });
        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should handle 404 error and return the error message', (done) => {
        const status = 404;
        const statusText = 'Not Found';
        const myErrorMessage = 'Error Code: 404, Message for you: Http failure response for fake_url_404: 404 Not Found';
        http.get('fake_url_404')
            .subscribe({
                error: (error: string) => {
                    // console.log("check err", error)
                    expect(error).toEqual(myErrorMessage); // working ... 
                    done();
                }
            });
        const req: TestRequest = httpMock.expectOne('fake_url_404');
        req.flush(myErrorMessage, { status, statusText });
    });

    it('should handle 500 error and return the error message', (done) => {
        const error500 = "http://httpstat.us/500";
        const myErrorMessage = "Error Code: 500, Message for you: Http failure response for http://httpstat.us/500: 500 Internal Server Error";
        http.get(error500).subscribe({
            error: (error) => {
                // console.log("expected error :::", error);
                expect(error).toEqual(myErrorMessage);
                done();
            }
        });
        const req: TestRequest = httpMock.expectOne(error500);
        req.flush("Internal Server Error", { status: 500, statusText: 'Internal Server Error' });
    });
});
