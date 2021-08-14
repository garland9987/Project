import { Component } from '@angular/core';

import { Modal } from '../modal';
import { ModalRef } from '../modal.ref';
import { ModalContext } from '../modal.context';

@Component({
	selector: 'app-simple-modal',
	templateUrl: './simple-modal.component.html',
	styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent implements Modal {
	public modalRef: ModalRef;
	public modalContext: ModalContext;
}
