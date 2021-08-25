import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Modal, ModalRef, ModalContext, SimpleModalService } from '@core/module/modal';
import { AccountService } from '@core/restful/account/account.service';
import { LoginService } from '@core/service/login/login.service';

import { BaseComponent } from '@shared/component/base/base.component';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit, Modal {
	public title: string = 'Creat a new account';
	public modalRef: ModalRef;
	public modalContext: ModalContext;
	public formGroup: FormGroup;

	constructor(private formBuilder: FormBuilder,
				private simpleModalService: SimpleModalService,
				private accountService: AccountService,
				private loginService: LoginService) {
		super();
	}

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			name: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.pattern('^[^ _-]+$'), Validators.minLength(6), Validators.maxLength(10)]]
		});
	}

	get name() { return this.formGroup.get('name') as FormControl; }
	get password() { return this.formGroup.get('password') as FormControl; }

	confirm(): void {
		this.isSubmitted = true;

		if(this.formGroup.valid) {
			this.accountService.register(this.name.value, this.password.value)
				.pipe(takeUntil(this.terminator))
				.subscribe((account) => {
					if(account.username && account.token) {
						this.loginService.store(account.username, account.token);
						this.modalRef.close();
					}
				}, (error) => {
					this.simpleModalService.open('Error', 'Failed to create a new account', 2000);
				});
		}
	}

	cancel(): void {
		this.modalRef.close();
	}
}
