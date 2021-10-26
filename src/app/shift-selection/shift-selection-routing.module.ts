import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShiftSelectionComponent } from './shift-selection.component';

const routes: Routes = [
	{ path: '', component: ShiftSelectionComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShiftSelectionRoutingModule {}
