import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { RestfulRoutingModule } from './restful-routing.module';
import { RestfulComponent } from './restful.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { SortPipe } from './pipe/sort.pipe';

@NgModule({
	declarations: [
		RestfulComponent,
		ProductListComponent,
		ProductCreateComponent,
		ProductEditComponent,
		SortPipe
	],
	imports: [
		CommonModule,
		SharedModule,
		RestfulRoutingModule
	]
})
export class RestfulModule {}
