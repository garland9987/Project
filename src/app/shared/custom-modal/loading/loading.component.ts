import { Component } from '@angular/core';

import { Modal, ModalRef, ModalContext } from '@core/module/modal';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements Modal {
	public modalRef: ModalRef;
	public modalContext: ModalContext;
}
