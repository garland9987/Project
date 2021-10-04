import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@shared/component/base/base.component';
import { Utility } from '@shared/global/utility';
import { WizardService } from '../wizard.service';

@Component({
	selector: 'app-date-of-birth',
	templateUrl: './date-of-birth.component.html',
	styleUrls: ['./date-of-birth.component.scss'],
	exportAs: 'dateOfBirth'
})
export class DateOfBirthComponent extends BaseComponent implements OnInit {
	public formGroup: FormGroup;

	@ViewChild(TemplateRef) templateRef: TemplateRef<any>;

	constructor(private formBuilder: FormBuilder,
				private wizardService: WizardService) {
		super();
	}

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			date: ['', [Validators.required]],
			gender: ['', [Validators.required]]
		});

		this.formGroup.valueChanges
			.pipe(takeUntil(this.terminator))
			.subscribe((formGroup) => {
				this.wizardService.date = formGroup.date;
				this.wizardService.gender = formGroup.gender;
			});
	}

	get date() { return this.formGroup.get('date') as FormControl; }
	get gender() { return this.formGroup.get('gender') as FormControl; }

	isMobileDevice(): boolean {
		return Utility.isMobileDevice();
	}
}
