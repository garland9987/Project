import { Component } from '@angular/core';

import { Modal, ModalRef, ModalContext } from '@core/module/modal';

@Component({
	selector: 'app-unsaved',
	templateUrl: './unsaved.component.html',
	styleUrls: ['./unsaved.component.scss']
})
export class UnsavedComponent implements Modal {
	public modalRef: ModalRef;
	public modalContext: ModalContext;

	confirm() {
		this.modalContext.subject.next(true);
		this.modalContext.subject.complete();

		this.modalRef.close();
	}

	cancel() {
		this.modalContext.subject.next(false);
		this.modalContext.subject.complete();

		this.modalRef.close();
	}
}
