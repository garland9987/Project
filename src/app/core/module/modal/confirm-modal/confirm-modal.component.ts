import { Component } from '@angular/core';

import { Modal } from '../modal';
import { ModalRef } from '../modal.ref';
import { ModalContext } from '../modal.context';

@Component({
	selector: 'app-confirm-modal',
	templateUrl: './confirm-modal.component.html',
	styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements Modal {
	public modalRef: ModalRef;
	public modalContext: ModalContext;

	confirm(): void {
		this.modalRef.respond(true);
		this.modalRef.close();
	}

	cancel(): void {
		this.modalRef.respond(false);
		this.modalRef.close();
	}
}
