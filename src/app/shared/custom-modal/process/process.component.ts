import { Component, OnInit } from '@angular/core';

import { Modal, ModalRef, ModalContext } from '@core/module/modal';

@Component({
	selector: 'app-process',
	templateUrl: './process.component.html',
	styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements Modal {
	public modalRef: ModalRef;
	public modalContext: ModalContext;
}
