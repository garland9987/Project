import { Component, Input } from '@angular/core';

import { LoginService } from '@core/service/login/login.service';

@Component({
	selector: 'app-account-management',
	templateUrl: './account-management.component.html',
	styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent {
	@Input() userName: string;

	constructor(private loginService: LoginService) {}

	logout(): void {
		this.loginService.clear();
	}
}
