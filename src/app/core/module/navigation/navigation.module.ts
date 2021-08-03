import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { NavigationComponent } from './navigation.component';

@NgModule({
	declarations: [
		NavigationComponent
	],
	imports: [
		CommonModule,
		SharedModule
	],
	exports: [
		NavigationComponent
	]
})
export class NavigationModule { }
