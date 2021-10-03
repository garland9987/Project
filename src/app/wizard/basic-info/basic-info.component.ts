import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@shared/component/base/base.component';
import { WizardService } from '../wizard.service';

@Component({
	selector: 'app-basic-info',
	templateUrl: './basic-info.component.html',
	styleUrls: ['./basic-info.component.scss'],
	exportAs: 'basicInfo'
})
export class BasicInfoComponent extends BaseComponent implements OnInit {
	public formGroup: FormGroup;

	@ViewChild(TemplateRef) templateRef: TemplateRef<any>;

	constructor(private formBuilder: FormBuilder,
				private wizardService: WizardService) {
		super();
	}

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			firstName: ['', [Validators.required]],
			lastName: ['', [Validators.required]]
		});

		this.formGroup.valueChanges
			.pipe(takeUntil(this.terminator))
			.subscribe((formGroup) => {
				this.wizardService.firstName = formGroup.firstName;
				this.wizardService.lastName = formGroup.lastName;
			});
	}

	get firstName() { return this.formGroup.get('firstName') as FormControl; }
	get lastName() { return this.formGroup.get('lastName') as FormControl; }
}
