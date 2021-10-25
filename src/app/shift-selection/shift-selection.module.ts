import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { ShiftSelectionRoutingModule } from './shift-selection-routing.module';
import { ShiftSelectionComponent } from './shift-selection.component';


@NgModule({
	declarations: [
		ShiftSelectionComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		ShiftSelectionRoutingModule
	]
})
export class ShiftSelectionModule {}
