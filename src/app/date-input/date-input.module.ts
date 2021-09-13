import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { DateInputRoutingModule } from './date-input-routing.module';
import { DateInputComponent } from './date-input.component';


@NgModule({
	declarations: [
		DateInputComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		DateInputRoutingModule
	]
})
export class DateInputModule {}
