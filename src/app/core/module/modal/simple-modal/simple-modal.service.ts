import { Injectable } from '@angular/core';

import { SimpleModalComponent } from './simple-modal.component';
import { ModalService } from '../modal.service';

@Injectable({
	providedIn: 'root'
})
export class SimpleModalService {

	constructor(private modalService: ModalService) {}

	open(title: string, content: string, closeDelay: number): void {
		const modalRef = this.modalService.open(SimpleModalComponent, { title, content });
		setTimeout(() => { modalRef.close(); }, closeDelay);
	}
}
