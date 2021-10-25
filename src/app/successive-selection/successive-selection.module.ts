import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { SuccessiveSelectionRoutingModule } from './successive-selection-routing.module';
import { SuccessiveSelectionComponent } from './successive-selection.component';


@NgModule({
	declarations: [
		SuccessiveSelectionComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		SuccessiveSelectionRoutingModule
	]
})
export class SuccessiveSelectionModule {}
