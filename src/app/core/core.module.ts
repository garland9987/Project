import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxWebstorageModule } from 'ngx-webstorage';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { RetryInterceptor } from './interceptor/retry/retry.interceptor';
import { AuthorizationInterceptor } from './interceptor/authorization/authorization.interceptor';

import { NavigationModule } from './module/navigation/navigation.module';
import { NotFoundModule } from './module/not-found/not-found.module';
import { ModalModule } from './module/modal/modal.module';

import { RouteTracerService } from './service/route-tracer/route-tracer.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

@NgModule({
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true },
	],
	imports: [
		NgxWebstorageModule.forRoot(),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
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
export class CoreModule {

	constructor(private routeTracerService: RouteTracerService,
				private translateService: TranslateService,
				@Optional() @SkipSelf() parentModule?: CoreModule) {

		if(parentModule) throw new Error('CoreModule is already loaded. Import it in the AppModule only.');

		translateService.addLangs(['en', 'zh']);
		translateService.setDefaultLang('en');
	}
}
