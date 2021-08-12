import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { AccountManagementComponent } from './account-management.component';

@NgModule({
	declarations: [
		AccountManagementComponent
	],
	imports: [
		CommonModule,
		SharedModule
	],
	exports: [
		AccountManagementComponent
	]
})
export class AccountManagementModule { }
