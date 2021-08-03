import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationModule } from './module/navigation/navigation.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		NavigationModule
	],
	exports: [
		NavigationModule
	]
})
export class CoreModule { }
