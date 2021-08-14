import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { Exit } from './exit';
import { ModalService } from '@core/module/modal';
import { UnsavedComponent } from '@shared/custom-modal/unsaved/unsaved.component';

@Injectable({
	providedIn: 'root'
})
export class UnsavedGuard implements CanDeactivate<Exit> {

	constructor(private modalService: ModalService) {}

	canDeactivate(component: Exit, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if(!component.canExit || component.canExit()) return true;

		const title: string = 'Unsaved';
		const content: string = 'Please confirm to leave this page.';
		const subject: Subject<boolean> = new Subject<boolean>();

		const modalRef = this.modalService.open(UnsavedComponent, { title, content, subject });

		return subject;
	}
}
