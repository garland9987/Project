import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { TranslationRoutingModule } from './translation-routing.module';
import { TranslationComponent } from './translation.component';

@NgModule({
	declarations: [
		TranslationComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		TranslationRoutingModule
	]
})
export class TranslationModule {}
