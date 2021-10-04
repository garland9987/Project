import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { WizardRoutingModule } from './wizard-routing.module';
import { WizardComponent } from './wizard.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { DateOfBirthComponent } from './date-of-birth/date-of-birth.component';
import { LoginDetailsComponent } from './login-details/login-details.component';
import { SubmissionComponent } from './submission/submission.component';
import { WizardIndicatorComponent } from './wizard-indicator/wizard-indicator.component';

@NgModule({
	declarations: [
		WizardComponent,
		BasicInfoComponent,
		ContactInfoComponent,
		DateOfBirthComponent,
		LoginDetailsComponent,
		SubmissionComponent,
		WizardIndicatorComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		WizardRoutingModule
	]
})
export class WizardModule {}
