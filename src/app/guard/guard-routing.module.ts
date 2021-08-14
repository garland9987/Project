import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardComponent } from './guard.component';
import { AuthorizedGuard } from '@core/guard/authorized/authorized.guard';
import { UnsavedGuard } from '@core/guard/unsaved/unsaved.guard';

const routes: Routes = [
	{
		path: '',
		component: GuardComponent,
		canActivate: [AuthorizedGuard],
		canDeactivate: [UnsavedGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GuardRoutingModule {}
