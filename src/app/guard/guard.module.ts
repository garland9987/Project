import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { GuardRoutingModule } from './guard-routing.module';
import { GuardComponent } from './guard.component';

@NgModule({
	declarations: [
		GuardComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		GuardRoutingModule
	]
})
export class GuardModule {}
