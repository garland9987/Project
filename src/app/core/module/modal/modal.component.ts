import { Component, AfterViewInit, OnDestroy, ViewChild, ComponentFactoryResolver, ComponentRef, ChangeDetectorRef, Type, ViewContainerRef } from '@angular/core';

import { ModalContext } from './modal.context';
import { ModalRef } from './modal.ref';
import { Modal } from './modal';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit, OnDestroy {
	public modalRef: ModalRef;
	public childComponentContext: ModalContext;
	public childComponentType: Type<Modal>;
	public childComponentRef: ComponentRef<Modal>;

	@ViewChild('viewContainerRef', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

	constructor(private componentFactoryResolver: ComponentFactoryResolver,
				private changeDetectorRef: ChangeDetectorRef) {}

	ngAfterViewInit() {
		this.viewContainerRef.clear();

		const componentFactory = this.componentFactoryResolver.resolveComponentFactory<Modal>(this.childComponentType);

		this.childComponentRef = this.viewContainerRef.createComponent<Modal>(componentFactory);
		this.childComponentRef.instance.modalRef = this.modalRef;
		this.childComponentRef.instance.modalContext = this.childComponentContext;

		this.changeDetectorRef.detectChanges();
	}

	ngOnDestroy() {
		this.childComponentRef.destroy();
	}
}
