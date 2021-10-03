import { Component, ViewChild, ViewContainerRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { WizardService } from './wizard.service';
import { BasicInfoComponent } from './basic-info/basic-info.component';

@Component({
	selector: 'app-wizard',
	templateUrl: './wizard.component.html',
	styleUrls: ['./wizard.component.scss'],
	providers: [WizardService]
})
export class WizardComponent implements AfterViewInit{
	public title: string = 'Wizard';

	@ViewChild('viewContainerRef', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
	@ViewChild('page1') page1: BasicInfoComponent;

	constructor(private changeDetectorRef: ChangeDetectorRef,
				private wizardService: WizardService) {}

	ngAfterViewInit() {
		this.viewContainerRef.createEmbeddedView(this.page1.templateRef);
		this.changeDetectorRef.detectChanges();
	}

	switch(component: any): void {
		this.viewContainerRef.clear();
		this.viewContainerRef.createEmbeddedView(component.templateRef);
	}

	submit(): void {
		console.log(this.wizardService);
	}
}
