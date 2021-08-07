import { Component } from '@angular/core';

import { Modal, ModalRef } from '@core/module/modal';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements Modal {
	public modalRef: ModalRef;

}
