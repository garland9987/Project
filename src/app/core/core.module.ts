import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationModule } from './module/navigation/navigation.module';
import { NotFoundModule } from './module/not-found/not-found.module';
import { ModalModule } from './module/modal/modal.module';
import { LoginModule } from './module/login/login.module';

@NgModule({
	imports: [
		CommonModule,
		NavigationModule,
		NotFoundModule,
		ModalModule,
		LoginModule
	],
	exports: [
		NavigationModule
	]
})
export class CoreModule { }
