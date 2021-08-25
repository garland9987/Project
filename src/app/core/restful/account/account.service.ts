import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { baseUrl } from '@shared/global/variable';
import { RestfulService } from '@core/restful/restful.service';

@Injectable({
	providedIn: 'root'
})
export class AccountService {

	constructor(private restfulService: RestfulService) {}

	login(username: string, password: string): Observable<any> {
		const verb = 'POST';
		const url = `${ baseUrl }/login`;
		const options = { body: { username, password } };

		return this.restfulService.sendRequest<any>(verb, url, options);
	}

	register(username: string, password: string): Observable<any> {
		const verb = 'POST';
		const url = `${ baseUrl }/users`;
		const options = { body: { username, password } };

		return this.restfulService.sendRequest<any>(verb, url, options);
	}

	changePassword(username: string, oldPassword: string, newPassword: string): Observable<any> {
		const verb = 'PUT'
		const url = `${ baseUrl }/password`;
		const options = { body: { username, oldPassword, newPassword } };

		return this.restfulService.sendRequest<any>(verb, url, options);
	}
}
