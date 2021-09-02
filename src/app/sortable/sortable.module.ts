import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { SortableRoutingModule } from './sortable-routing.module';
import { SortableComponent } from './sortable.component';

@NgModule({
	declarations: [
		SortableComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		SortableRoutingModule
	]
})
export class SortableModule {}
