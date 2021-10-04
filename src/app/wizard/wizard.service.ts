import { Injectable } from '@angular/core';

@Injectable()
export class WizardService {
	public firstName: string = '';
	public lastName: string = '';
	public email: string = '';
	public phone: string = '';
	public date: string = '';
	public gender: string = '';
	public userName: string = '';
	public password: string = '';

	clear(): void {
		this.firstName = '';
		this.lastName = '';
		this.email = '';
		this.phone = '';
		this.date = '';
		this.gender = '';
		this.userName = '';
		this.password = '';
	}
}
