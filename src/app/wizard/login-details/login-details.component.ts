import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@shared/component/base/base.component';
import { WizardService } from '../wizard.service';

@Component({
	selector: 'app-login-details',
	templateUrl: './login-details.component.html',
	styleUrls: ['./login-details.component.scss'],
	exportAs: 'loginDetails'
})
export class LoginDetailsComponent extends BaseComponent implements OnInit {
	public formGroup: FormGroup;

	@ViewChild(TemplateRef) templateRef: TemplateRef<any>;

	constructor(private formBuilder: FormBuilder,
				private wizardService: WizardService) {
		super();
	}

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			userName: ['', [Validators.required]],
			password: ['', [Validators.required]]
		});

		this.formGroup.valueChanges
			.pipe(takeUntil(this.terminator))
			.subscribe((formGroup) => {
				this.wizardService.userName = formGroup.userName;
				this.wizardService.password = formGroup.password;
			});
	}

	get userName() { return this.formGroup.get('userName') as FormControl; }
	get password() { return this.formGroup.get('password') as FormControl; }
}
