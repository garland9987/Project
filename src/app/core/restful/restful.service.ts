import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RestfulService {

	constructor(private httpClient: HttpClient) {}

	sendRequest<T>(verb: string, url: string, options: {[index: string]: any} = {}): Observable<T> {
		return this.httpClient.request<T>(verb, url, options);
	}

	sendRequestHttpResponse<T>(verb: string, url: string, options: {[index: string]: any} = {}): Observable<HttpResponse<T>> {
		return this.httpClient.request<T>(verb, url, { ...options, observe: 'response' });
	}
}
