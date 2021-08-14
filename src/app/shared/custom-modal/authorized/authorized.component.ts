import { Component } from '@angular/core';

import { Modal, ModalRef, ModalContext } from '@core/module/modal';

@Component({
	selector: 'app-authorized',
	templateUrl: './authorized.component.html',
	styleUrls: ['./authorized.component.scss']
})
export class AuthorizedComponent implements Modal {
	public modalRef: ModalRef;
	public modalContext: ModalContext;

	ok(): void {
		this.modalContext.subject.next(false);
		this.modalContext.subject.complete();

		this.modalRef.close();
	}
}
