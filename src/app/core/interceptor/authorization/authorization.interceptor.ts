import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginService } from '@core/service/login/login.service';
import { productUrl } from '@shared/global/variable';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

	constructor(private loginService: LoginService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if(this.isTarget(request, productUrl)) {
			let token = this.loginService.retrieveToken();

			if(token) {
				return next.handle(request.clone({ setHeaders: { 'authorization': token } }));
			}
		}

		return next.handle(request);
	}

	isTarget(request: HttpRequest<unknown>, ...urls: string[]): boolean {
		for(let url of urls) {
			if(request.url.startsWith(url)) return true;
		}

		return false;
	}
}
