import { Injectable, Injector, Inject, ComponentFactoryResolver, ComponentRef, ApplicationRef, Type } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { ModalRef } from './modal.ref';
import { ModalComponent } from './modal.component';
import { ModalContext } from './modal.context';
import { Modal } from './modal';

@Injectable({
	providedIn: 'root'
})
export class ModalService {

	constructor(private injector: Injector,
				private componentFactoryResolver: ComponentFactoryResolver,
				private applicationRef: ApplicationRef,
				@Inject(DOCUMENT) private document: Document) {}

	open(component: Type<Modal>, context: ModalContext = {}): ModalRef {
		// create a new modalRef for each modal, thus each modal is independent
		const modalRef = new ModalRef();

		// create componentRef for ModalComponent
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
		const componentRef = componentFactory.create(this.injector);

		// enable template to detect changes
		this.applicationRef.attachView(componentRef.hostView);

		// init ModalComponent instance
		componentRef.instance.modalRef = modalRef;
		componentRef.instance.childComponentType = component;
		componentRef.instance.childComponentContext = context;

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
