import { Injectable } from '@angular/core';

import { ConfirmModalComponent } from './confirm-modal.component';
import { ModalService } from '../modal.service';
import { ModalRef } from '../modal.ref';

@Injectable({
	providedIn: 'root'
})
export class ConfirmModalService {

	constructor(private modalService: ModalService) {}

	open(title: string, content: string): ModalRef {
		return this.modalService.open(ConfirmModalComponent, { title, content });
	}
}
