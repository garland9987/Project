import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from '@core/restful/account/account.service';
import { LoginService } from '@core/service/login/login.service';
import { SimpleModalService } from '@core/module/modal';
import { Exit } from '@core/guard/unsaved/exit';

import { BaseComponent } from '@shared/component/base/base.component';

@Component({
	selector: 'app-guard',
	templateUrl: './guard.component.html',
	styleUrls: ['./guard.component.scss']
})
export class GuardComponent extends BaseComponent implements OnInit, Exit{
	public title: string = 'Guard';
	public formGroup: FormGroup;

	constructor(private formBuilder: FormBuilder,
				private accountService: AccountService,
				private loginService: LoginService,
				private simpleModalService: SimpleModalService) {
		super();
	}

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			oldPassword: ['', [Validators.required, Validators.pattern('^[^ _-]+$'), Validators.minLength(6), Validators.maxLength(10)]],
			newPassword: ['', [Validators.required, Validators.pattern('^[^ _-]+$'), Validators.minLength(6), Validators.maxLength(10)]]
		});
	}

	get oldPassword() { return this.formGroup.get('oldPassword') as FormControl; }
	get newPassword() { return this.formGroup.get('newPassword') as FormControl; }

	submit() {
		this.isSubmitted = true;

		if(this.formGroup.valid) {
			const userName = this.loginService.retrieveUserName();
			const oldPassword = this.oldPassword.value;
			const newPassword = this.newPassword.value;

			this.accountService.changePassword(userName, oldPassword, newPassword)
				.pipe(takeUntil(this.terminator))
				.subscribe(() => {
					this.isSubmitted = false;
					this.formGroup.reset();
					this.simpleModalService.open('Success', 'Password has been changed successfully.', 1500);
				}, (error) => {
					this.simpleModalService.open('Error', 'Failed to change password', 2000);
				});
		}
	}

	canExit(): boolean {
		if(this.formGroup.dirty) return false;

		return true;
	}
}
