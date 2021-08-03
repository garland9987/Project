import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationModule } from './module/navigation/navigation.module';
import { NotFoundModule } from './module/not-found/not-found.module';

@NgModule({
	imports: [
		CommonModule,
		NavigationModule,
		NotFoundModule
	],
	exports: [
		NavigationModule
	]
})
export class CoreModule { }
