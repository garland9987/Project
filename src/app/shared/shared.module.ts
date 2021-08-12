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

@NgModule({
	declarations: [
		FileUploadComponent,
		MenuComponent,
		MenuButtonComponent,
		MenuPanelComponent,
		MenuTriggerDirective,
		MenuItemDirective
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		FileUploadComponent,
		MenuComponent,
		MenuButtonComponent,
		MenuPanelComponent,
		MenuTriggerDirective,
		MenuItemDirective
	]
})
export class SharedModule { }
