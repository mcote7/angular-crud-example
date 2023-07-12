import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
        const myError = 'Error: Error Code: 404, Message for you: Http failure response for fake_url_404: 404 Not Found';
        http
            .get('fake_url_404')
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.log("error test?", `${error}`)
                    return throwError(() => `${error}`);
                })
            )
            .subscribe({
                next: () => {
                    fail('The request should have thrown an error');
                    done();
                },
                error: (error) => {
                    expect(error).toEqual(myError); // working ... 
                    done();
                }
            });
        const req = httpMock.expectOne('fake_url_404');
        req.flush(myError, { status, statusText });
    });
});