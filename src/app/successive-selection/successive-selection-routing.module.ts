import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SuccessiveSelectionComponent } from './successive-selection.component';

const routes: Routes = [
	{ path: '', component:SuccessiveSelectionComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SuccessiveSelectionRoutingModule {}
