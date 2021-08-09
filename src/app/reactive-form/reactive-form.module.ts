import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormRoutingModule } from './reactive-form-routing.module';

import { ReactiveFormComponent } from './reactive-form.component';

@NgModule({
	declarations: [
		ReactiveFormComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		ReactiveFormRoutingModule
	]
})
export class ReactiveFormModule { }
