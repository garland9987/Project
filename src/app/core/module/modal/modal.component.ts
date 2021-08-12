import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, Renderer2, ComponentFactoryResolver, ComponentRef, ChangeDetectorRef, Type, ViewContainerRef } from '@angular/core';

import { ModalContext } from './modal.context';
import { ModalConfig } from './modal.config';
import { ModalRef } from './modal.ref';
import { Modal } from './modal';

type ModalType = 'standard' | 'custom';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {
	public modalContext: ModalContext;
	public modalConfig: ModalConfig;
	public modalRef: ModalRef;
	public modalType: ModalType;
	public childComponentRef: ComponentRef<Modal>;
	public childComponentType: Type<Modal>;

	@ViewChild('modal', { static: true }) modal: ElementRef;
	@ViewChild('viewContainerRef', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

	constructor(private renderer: Renderer2,
				private componentFactoryResolver: ComponentFactoryResolver,
				private changeDetectorRef: ChangeDetectorRef) {}

	ngOnInit() {
		if(!this.modalConfig.showBackdrop) {
			this.renderer.addClass(this.modal.nativeElement, 'background-transparent');
		}
	}

	ngAfterViewInit() {
		if(this.modalType === 'custom') {
			this.viewContainerRef.clear();

			const componentFactory = this.componentFactoryResolver.resolveComponentFactory<Modal>(this.childComponentType);
			this.childComponentRef = this.viewContainerRef.createComponent<Modal>(componentFactory);
			this.childComponentRef.instance.modalRef = this.modalRef;

			this.changeDetectorRef.detectChanges();
		}
	}

	ngOnDestroy() {
		if(this.childComponentRef) {
			this.childComponentRef.destroy();
		}
	}

	react(value: any): void {
		try {
			this.modalRef.respond(value);
		}
		catch(error) {
			console.error('ModalComponent', error);
		}
		finally {
			this.modalRef.close();
		}
	}
}
