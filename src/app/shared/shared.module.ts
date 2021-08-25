import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FileUploadComponent } from './component/file-upload/file-upload.component';
import { MenuComponent } from './component/menu/menu.component';
import { MenuButtonComponent } from './component/menu/menu-button/menu-button.component';
import { MenuPanelComponent } from './component/menu/menu-panel/menu-panel.component';
import { MenuTriggerDirective } from './component/menu/menu-trigger.directive';
import { MenuItemDirective } from './component/menu/menu-item.directive';
import { LoginComponent } from './custom-modal/login/login.component';
import { RegisterComponent } from './custom-modal/register/register.component';
import { AuthorizedComponent } from './custom-modal/authorized/authorized.component';
import { UnsavedComponent } from './custom-modal/unsaved/unsaved.component';
import { BaseComponent } from './component/base/base.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { LoadingComponent } from './custom-modal/loading/loading.component';
import { ProcessComponent } from './custom-modal/process/process.component';
import { SortByPipe } from './pipe/sort-by/sort-by.pipe';

@NgModule({
	declarations: [
		FileUploadComponent,
		MenuComponent,
		MenuButtonComponent,
		MenuPanelComponent,
		MenuTriggerDirective,
		MenuItemDirective,
		LoginComponent,
		RegisterComponent,
		AuthorizedComponent,
		UnsavedComponent,
		BaseComponent,
		PaginationComponent,
		LoadingComponent,
		ProcessComponent,
		SortByPipe
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports: [
		// module
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		// component & directive
		FileUploadComponent,
		MenuComponent,
		MenuButtonComponent,
		MenuPanelComponent,
		MenuTriggerDirective,
		MenuItemDirective,
		PaginationComponent,
		// pipe
		SortByPipe
	]
})
export class SharedModule {}
