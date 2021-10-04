import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@shared/component/base/base.component';
import { WizardService } from '../wizard.service';

@Component({
	selector: 'app-contact-info',
	templateUrl: './contact-info.component.html',
	styleUrls: ['./contact-info.component.scss'],
	exportAs: 'contactInfo'
})
export class ContactInfoComponent extends BaseComponent implements OnInit {
	public formGroup: FormGroup;

	@ViewChild(TemplateRef) templateRef: TemplateRef<any>;

	constructor(private formBuilder: FormBuilder,
				private wizardService: WizardService) {
		super();
	}

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			phone: ['', [Validators.required]]
		});

		this.formGroup.valueChanges
			.pipe(takeUntil(this.terminator))
			.subscribe((formGroup) => {
				this.wizardService.email = formGroup.email;
				this.wizardService.phone = formGroup.phone;
			});
	}

	get email() { return this.formGroup.get('email') as FormControl; }
	get phone() { return this.formGroup.get('phone') as FormControl; }
}
