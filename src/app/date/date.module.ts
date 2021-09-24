import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { DateRoutingModule } from './date-routing.module';
import { DateComponent } from './date.component';

@NgModule({
	declarations: [
		DateComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		DateRoutingModule
	]
})
export class DateModule {}
