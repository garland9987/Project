import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Modal, ModalRef, ModalContext, ModalService, SimpleModalService } from '@core/module/modal';
import { RegisterComponent } from '@shared/custom-modal/register/register.component';
import { AccountService } from '@core/restful/account/account.service';
import { LoginService } from '@core/service/login/login.service';

import { BaseComponent } from '@shared/component/base/base.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit, Modal{
	public title: string = 'Login';
	public modalRef: ModalRef;
	public modalContext: ModalContext;
	public formGroup: FormGroup;

	constructor(private formBuilder: FormBuilder,
				private modalService: ModalService,
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

	login(): void {
		this.isSubmitted = true;

		if(this.formGroup.valid) {
			this.accountService.login(this.name.value, this.password.value)
				.pipe(takeUntil(this.terminator))
				.subscribe((account) => {
					if(account.username && account.token) {
						this.loginService.store(account.username, account.token);
						this.modalRef.close();
					}
				}, (error) => {
					this.simpleModalService.open('Error', 'Failed to login.\nPlease check user name or password.', 2000);
				});
		}
	}

	register(): void {
		this.modalRef.close();
		this.modalService.open(RegisterComponent);
	}

	cancel(): void {
		this.modalRef.close();
	}
}
