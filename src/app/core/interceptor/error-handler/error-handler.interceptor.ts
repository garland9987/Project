import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { ModalContext, ModalService } from '@core/module/modal';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

	constructor(private modalService: ModalService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			retry(2),
			catchError((error: HttpErrorResponse) => {
				let title: string = 'Error';
				let content: string;

				if(error.error instanceof ErrorEvent) {
					// client-side error
					content = error.error.message;
				}
				else {
					// server-side error
					content = `${ error.statusText } (${ error.status })`;
				}

				const modalContext: ModalContext = new ModalContext(title, content);
				const modalRef = this.modalService.open(modalContext);

				setTimeout(() => { modalRef.close(); }, 1500);

				return throwError(error);
			})
		);
	}
}
