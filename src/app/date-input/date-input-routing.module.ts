import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DateInputComponent } from './date-input.component';

const routes: Routes = [
	{ path: '', component: DateInputComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DateInputRoutingModule {}
