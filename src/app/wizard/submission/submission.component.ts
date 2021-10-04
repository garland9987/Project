import { Component, OnChanges, SimpleChanges, ViewChild, TemplateRef, Input } from '@angular/core';

import { WizardService } from '../wizard.service';

@Component({
	selector: 'app-submission',
	templateUrl: './submission.component.html',
	styleUrls: ['./submission.component.scss'],
	exportAs: 'submission'
})
export class SubmissionComponent implements OnChanges {
	public firstName: string = '';
	public lastName: string = '';
	public email: string = '';
	public phone: string = '';
	public date: string = '';
	public gender: string = '';
	public userName: string = '';
	public password: string = '';

	@Input() page: string;

	@ViewChild(TemplateRef) templateRef: TemplateRef<any>;

	constructor(private wizardService: WizardService) {}

	ngOnChanges(changes: SimpleChanges) {
		if(this.page === '5') {
			this.firstName = this.wizardService.firstName;
			this.lastName = this.wizardService.lastName;
			this.email = this.wizardService.email;
			this.phone = this.wizardService.phone;
			this.date = this.wizardService.date;
			this.gender = this.wizardService.gender;
			this.userName = this.wizardService.userName;
			this.password = this.wizardService.password;
		}
	}
}
