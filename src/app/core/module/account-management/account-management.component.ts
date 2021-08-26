import { Component, Input } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { LoginService } from '@core/service/login/login.service';

@Component({
	selector: 'app-account-management',
	templateUrl: './account-management.component.html',
	styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent {
	@Input() userName: string;

	constructor(private loginService: LoginService,
				private translateService: TranslateService) {}

	useLanguage(language: string): void {
		this.translateService.use(language);
	}

	logout(): void {
		this.loginService.clear();
	}
}
