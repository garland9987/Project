import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationModule } from './module/navigation/navigation.module';
import { NotFoundModule } from './module/not-found/not-found.module';
import { ModalModule } from './module/modal/modal.module';

@NgModule({
	imports: [
		CommonModule,
		NavigationModule,
		NotFoundModule,
		ModalModule
	],
	exports: [
		NavigationModule
	]
})
export class CoreModule { }
