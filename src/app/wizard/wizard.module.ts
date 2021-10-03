import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { WizardRoutingModule } from './wizard-routing.module';
import { WizardComponent } from './wizard.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { DateOfBirthComponent } from './date-of-birth/date-of-birth.component';
import { LoginDetailsComponent } from './login-details/login-details.component';

@NgModule({
	declarations: [
		WizardComponent,
		BasicInfoComponent,
		ContactInfoComponent,
		DateOfBirthComponent,
		LoginDetailsComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		WizardRoutingModule
	]
})
export class WizardModule {}
