import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AccountManagementModule } from '@core/module/account-management/account-management.module';

import { NavigationComponent } from './navigation.component';

@NgModule({
	declarations: [
		NavigationComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		AccountManagementModule
	],
	exports: [
		NavigationComponent
	]
})
export class NavigationModule { }
