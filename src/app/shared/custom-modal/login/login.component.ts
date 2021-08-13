import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Modal, ModalRef, ModalService } from '@core/module/modal';
import { RegisterComponent } from '@shared/custom-modal/register/register.component';
import { AccountService } from '@core/restful/account/account.service';
import { LoginService } from '@core/service/login/login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, Modal{
	public modalRef: ModalRef;
	public formGroup: FormGroup;
	public isSubmitted: boolean = false;

	public terminator: Subject<boolean> = new Subject<boolean>();

	constructor(private formBuilder: FormBuilder,
				private modalService: ModalService,
				private accountService: AccountService,
				private loginService: LoginService) {}

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			name: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.pattern('^[^ _-]+$'), Validators.minLength(6), Validators.maxLength(10)]]
		});
	}

	ngOnDestroy() {
		this.terminator.next(true);
		this.terminator.complete();
	}

	get name() { return this.formGroup.get('name') as FormControl; }
	get password() { return this.formGroup.get('password') as FormControl; }

	validation(control: FormControl): {[property: string]: boolean} {
		return {
			'form-valid-status': control.valid && (control.dirty || control.touched || this.isSubmitted),
			'form-invalid-status': control.invalid && (control.dirty || control.touched || this.isSubmitted)
		};
	}

	login(): void {
		this.isSubmitted = true;

		if(this.formGroup.valid) {
			this.accountService.login(this.name.value, this.password.value)
				.pipe(takeUntil(this.terminator))
				.subscribe((httpResponse: HttpResponse<any>) => {
					const account = httpResponse.body;

					if(account.token) {
						this.loginService.store(account.username, account.token);
						this.modalRef.close();
					}
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
