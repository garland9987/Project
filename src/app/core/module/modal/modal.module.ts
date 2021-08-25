import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal.component';
import { SimpleModalComponent } from './simple-modal/simple-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
	declarations: [
		ModalComponent,
		SimpleModalComponent,
		ConfirmModalComponent
	],
	imports: [
		CommonModule
	]
})
export class ModalModule {}
