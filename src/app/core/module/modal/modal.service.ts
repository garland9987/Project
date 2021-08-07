import { Injectable, Injector, Inject, ComponentFactoryResolver, ComponentRef, ApplicationRef, Type } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { ModalContext } from './modal.context';
import { ModalConfig } from './modal.config';
import { ModalComponent } from './modal.component';
import { ModalRef } from './modal.ref';
import { Modal } from './modal';

const modalConfigDefault = {
	showBackdrop: true,
	showClose: false,
	close: null
};

@Injectable({
	providedIn: 'root'
})
export class ModalService {

	constructor(private injector: Injector,
				private componentFactoryResolver: ComponentFactoryResolver,
				private applicationRef: ApplicationRef,
				@Inject(DOCUMENT) private document: Document) { }

	open(modalContextOrComponent: ModalContext | Type<Modal>, modalConfig: ModalConfig = modalConfigDefault): ModalRef {
		// create a new modalRef for each modal, thus each modal is independent
		const modalRef = new ModalRef();

		// create componentRef for ModalComponent
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
		const componentRef = componentFactory.create(this.injector);

		// enable template to detect changes
		this.applicationRef.attachView(componentRef.hostView);

		// check the type of the modalContextOrComponent
		// init ModalComponent based on the argument's type
		if(modalContextOrComponent instanceof ModalContext) {
			componentRef.instance.modalContext = modalContextOrComponent;
			componentRef.instance.modalType = 'standard';
		}
		else {
			componentRef.instance.childComponentType = modalContextOrComponent;
			componentRef.instance.modalType = 'custom';
		}

		componentRef.instance.modalRef = modalRef;
		componentRef.instance.modalConfig = modalConfig;

		// append the node to the body
		const { nativeElement } = componentRef.location;
		this.document.body.appendChild(nativeElement);

		// wait for the close signal
		const subscription = modalRef.closure.subscribe(() => {
			this.applicationRef.detachView(componentRef.hostView);
			componentRef.destroy();

			subscription.unsubscribe();
		});

		return modalRef;
	}
}
