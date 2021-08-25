import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RestfulComponent } from './restful.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductCreateComponent } from './product-create/product-create.component';

const routes: Routes = [
	{
		path: '',
		component: RestfulComponent,
		children: [
			{ path: 'product/create', component: ProductCreateComponent },
			{ path: 'product/edit/:id', component: ProductEditComponent },
			{ path: 'products/:page', component: ProductListComponent },
			{ path: '', redirectTo: 'products/1', pathMatch: 'full' }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RestfulRoutingModule {}
