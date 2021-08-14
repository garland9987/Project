import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { ModalService } from '@core/module/modal';
import { LoginService } from '@core/service/login/login.service';
import { AuthorizedComponent } from '@shared/custom-modal/authorized/authorized.component';

@Injectable({
	providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {

	constructor(private modalService: ModalService,
				private loginService: LoginService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		if(this.loginService.loginStatus()) return true;

		const title: string = 'Unauthorized';
		const content: string = 'Please login before going to this page.';
		const subject: Subject<boolean> = new Subject<boolean>();

		const modalRef = this.modalService.open(AuthorizedComponent, { title, content, subject });

		return subject;
	}
}
