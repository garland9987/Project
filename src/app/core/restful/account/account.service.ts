import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { baseUrl } from '@shared/global/variable';

@Injectable({
	providedIn: 'root'
})
export class AccountService {

	constructor(private httpClient: HttpClient) {}

	login(username: string, password: string): Observable<HttpResponse<any>> {
		const verb = 'POST';
		const url = `${ baseUrl }/login`;
		const options = { body: { username, password } };

		return this.sendRequest<any>(verb, url, options);
	}

	register(username: string, password: string): Observable<HttpResponse<any>> {
		const verb = 'POST';
		const url = `${ baseUrl }/users`;
		const options = { body: { username, password } };

		return this.sendRequest<any>(verb, url, options);
	}

	sendRequest<T>(verb: string, url: string, options: {[index: string]: any} = {}): Observable<HttpResponse<T>> {
		return this.httpClient.request<T>(verb, url, { ...options, observe: 'response' });
	}
}
