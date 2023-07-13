import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    // console.log("original error :::", error)
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        errorMsg = `Error: ${error.error.message}`;
                    } else {
                        errorMsg = `Error Code: ${error.status}, Message for you: ${error.message}`;
                    }
                    // console.log("custom error :::", errorMsg) // ⬅️ use for test ...
                    return throwError(() => errorMsg);
                })
            );
    }
}

// console.log("http intercepted!", request, next)
// console.log('this is client/network side error'); if...
// console.log('this is server side error'); else...
// console.log("error intercepted: ", errorMsg)
// 