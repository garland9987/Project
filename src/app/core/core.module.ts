import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxWebstorageModule } from 'ngx-webstorage';

import { ErrorHandlerInterceptor } from './interceptor/error-handler/error-handler.interceptor';

import { NavigationModule } from './module/navigation/navigation.module';
import { NotFoundModule } from './module/not-found/not-found.module';
import { ModalModule } from './module/modal/modal.module';

@NgModule({
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true }
	],
	imports: [
		NgxWebstorageModule.forRoot(),
		CommonModule,
		HttpClientModule,
		NavigationModule,
		NotFoundModule,
		ModalModule
	],
	exports: [
		NavigationModule
	]
})
export class CoreModule {}
