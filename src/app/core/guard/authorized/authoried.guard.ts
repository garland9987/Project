import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { ModalContext, ModalService } from '@core/module/modal';
import { LoginService } from '@core/service/login/login.service';

@Injectable({
	providedIn: 'root'
})
export class AuthoriedGuard implements CanActivate {

	constructor(private modalService: ModalService,
				private loginService: LoginService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		if(this.loginService.loginStatus()) return true;

		const resultSubject: Subject<boolean> = new Subject<boolean>();
		const result: Observable<boolean> = resultSubject.asObservable();

		const title: string = 'Unauthorized';
		const content: string = 'Please login before going to this page.';


		return result;
	}
}
