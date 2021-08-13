import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	private isLoginSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
	public isLogin: Observable<boolean> = this.isLoginSubject.asObservable();

	constructor(private localStorageService: LocalStorageService) {
		this.loginStatus() ?
			this.isLoginSubject.next(true) :
			this.isLoginSubject.next(false);
	}

	store(username: string, token: string): void {
		this.localStorageService.store('username', username);
		this.localStorageService.store('token', token);

		this.isLoginSubject.next(true);
	}

	clear(): void {
		this.localStorageService.clear('username');
		this.localStorageService.clear('token');

		this.isLoginSubject.next(false);
	}

	retrieveUserName(): string {
		// return null if the key doesn't exist
		return this.localStorageService.retrieve('username');
	}

	retrieveToken(): string {
		// return null if the key doesn't exist
		return this.localStorageService.retrieve('token');
	}

	loginStatus(): boolean {
		return (this.localStorageService.retrieve('username') && this.localStorageService.retrieve('token'));
	}
}
