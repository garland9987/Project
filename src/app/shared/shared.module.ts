import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { FileUploadComponent } from './component/file-upload/file-upload.component';
import { LoginComponent } from './custom-modal/login/login.component';
import { RegisterComponent } from './custom-modal/register/register.component';
import { AuthorizedComponent } from './custom-modal/authorized/authorized.component';
import { UnsavedComponent } from './custom-modal/unsaved/unsaved.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { LoadingComponent } from './custom-modal/loading/loading.component';
import { ProcessComponent } from './custom-modal/process/process.component';
import { NamespacePipe } from './pipe/namespace/namespace.pipe';

import { BaseComponent } from './component/base/base.component';
import { BaseDirective } from './directive/base/base.directive';

import { MenuComponent } from './component/menu/menu.component';
import { MenuButtonComponent } from './component/menu/menu-button/menu-button.component';
import { MenuPanelComponent } from './component/menu/menu-panel/menu-panel.component';
import { MenuTriggerDirective } from './component/menu/menu-trigger.directive';
import { MenuItemDirective } from './component/menu/menu-item.directive';

import { DraggableDirective } from './directive/draggable/draggable.directive';
import { DraggableHandleDirective } from './directive/draggable/draggable-handle.directive';
import { SortableItemDirective } from './directive/sortable/sortable-item.directive';
import { SortableContainerDirective } from './directive/sortable/sortable-container.directive';

import { InputDateComponent } from './component/input-date/input-date.component';
import { DateSectionComponent } from './component/input-date/date-section/date-section.component';
import { MonthSectionComponent } from './component/input-date/month-section/month-section.component';
import { YearSectionComponent } from './component/input-date/year-section/year-section.component';
import { CalendarComponent } from './component/input-date/calendar/calendar.component';
import { MonthPipe } from './component/input-date/calendar/month.pipe';

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
		BaseDirective,
		PaginationComponent,
		LoadingComponent,
		ProcessComponent,
		NamespacePipe,
		DraggableDirective,
		DraggableHandleDirective,
		SortableItemDirective,
		SortableContainerDirective,
		InputDateComponent,
		DateSectionComponent,
		MonthSectionComponent,
		YearSectionComponent,
		CalendarComponent,
		MonthPipe
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule
	],
	exports: [
		// module
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule,
		// component & directive
		FileUploadComponent,
		MenuComponent,
		MenuButtonComponent,
		MenuPanelComponent,
		MenuTriggerDirective,
		MenuItemDirective,
		PaginationComponent,
		DraggableDirective,
		DraggableHandleDirective,
		SortableItemDirective,
		SortableContainerDirective,
		InputDateComponent,
		// pipe
		NamespacePipe
	]
})
export class SharedModule {}
