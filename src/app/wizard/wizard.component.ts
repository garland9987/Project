import { Component, ViewChild, ViewContainerRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { WizardService } from './wizard.service';
import { SimpleModalService } from '@core/module/modal';

import { BasicInfoComponent } from './basic-info/basic-info.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { DateOfBirthComponent } from './date-of-birth/date-of-birth.component';
import { LoginDetailsComponent } from './login-details/login-details.component';
import { SubmissionComponent } from './submission/submission.component';

@Component({
	selector: 'app-wizard',
	templateUrl: './wizard.component.html',
	styleUrls: ['./wizard.component.scss'],
	providers: [WizardService]
})
export class WizardComponent implements AfterViewInit{
	public title: string = 'Wizard';
	public currentPage: string = '1';

	@ViewChild('viewContainerRef', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

	@ViewChild('page1') page1: BasicInfoComponent;
	@ViewChild('page2') page2: ContactInfoComponent;
	@ViewChild('page3') page3: DateOfBirthComponent;
	@ViewChild('page4') page4: LoginDetailsComponent;

	constructor(private changeDetectorRef: ChangeDetectorRef,
				private wizardService: WizardService,
				private simpleModalService: SimpleModalService) {}

	ngAfterViewInit() {
		this.viewContainerRef.createEmbeddedView(this.page1.templateRef);
		this.changeDetectorRef.detectChanges();
	}

	switch(component: any): void {
		this.viewContainerRef.clear();
		this.viewContainerRef.createEmbeddedView(component.templateRef);

		if(component instanceof BasicInfoComponent) this.currentPage = '1';
		if(component instanceof ContactInfoComponent) this.currentPage = '2';
		if(component instanceof DateOfBirthComponent) this.currentPage = '3';
		if(component instanceof LoginDetailsComponent) this.currentPage = '4';
		if(component instanceof SubmissionComponent) this.currentPage = '5';
	}

	submit(): void {
		this.currentPage = '0';
		this.simpleModalService.open('Success', 'Your information has been submitted.', 2000);

		setTimeout(() => {
			this.page1.formGroup.reset();
			this.page2.formGroup.reset();
			this.page3.formGroup.reset();
			this.page4.formGroup.reset();

			this.wizardService.clear();

			this.currentPage = '1';
			this.viewContainerRef.clear();
			this.viewContainerRef.createEmbeddedView(this.page1.templateRef);
		}, 2000);
	}
}
