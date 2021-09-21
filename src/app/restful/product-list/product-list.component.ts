import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { of, throwError, Subject } from 'rxjs';
import { takeUntil, tap, filter, mergeAll, switchMap, catchError, finalize } from 'rxjs/operators';

import * as _ from 'lodash-es';

import { Product } from '@shared/model/product';
import { BaseComponent } from '@shared/component/base/base.component';
import { ProductService } from '@core/restful/product/product.service';
import { ModalRef, ModalService, SimpleModalService, ConfirmModalService } from '@core/module/modal';
import { LoadingComponent } from '@shared/custom-modal/loading/loading.component';
import { RouteTracerService } from '@core/service/route-tracer/route-tracer.service';
import { MapService } from '@core/service/map/map.service';
import { ScrollService } from '@core/service/scroll/scroll.service';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
	providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class ProductListComponent extends BaseComponent implements OnInit {

	// pagination setting
	public total: number = 0;
	public limit: number = 10;
	public selectedPage: number = 1;
	public displayedCount: number = 10;
	public position: string = 'center';

	// loading indicator
	public loadingModalRef: ModalRef;
	public loadingModalRefs: ModalRef[] = [];
	public loadingTimer: any;

	// sort
	public DEFAULT_SORT_OPTION: string = 'id';
	public sortOptions: string[] = ['id', 'price', 'quantity'];
	public selectedSortOption: string;

	// optional route params
	public optionalRouteParams: {[key: string]: any} = {};

	public products: Product[] = [];

	constructor(private router: Router,
				private activatedRoute: ActivatedRoute,
				private location: Location,
				private elementRef: ElementRef,
				private productService: ProductService,
				private modalService: ModalService,
				private simpleModalService: SimpleModalService,
				private confirmModalService: ConfirmModalService,
				private routeTracerService: RouteTracerService,
				private mapService: MapService,
				private scrollService: ScrollService) {
		super();
	}

	get element(): HTMLElement { return this.elementRef.nativeElement; }

	ngOnInit() {
		// it is not activated by the same url for the second time
		const params = this.activatedRoute.paramMap.pipe(
			tap((params) => {
				this.selectedPage = Number(params.get('page'));
				this.selectedSortOption = params.has('sortedBy') ? params.get('sortedBy') : this.DEFAULT_SORT_OPTION;

				this.configOptionalRouteParams('sortedBy', (this.selectedSortOption !== this.DEFAULT_SORT_OPTION) ? this.selectedSortOption : undefined);
			}));

		// it will be activated by any url, regardless of whether it is used for the second time.
		// require route setting: onSameUrlNavigation: 'reload'
		const refresh = this.router.events.pipe(
			filter((event) => { return event instanceof NavigationEnd; }),
			filter(() => { return this.routeTracerService.currentUrl == this.routeTracerService.previousUrl; }));

		const source = of(true).pipe(
			tap(() => { this.showLoadingIndicator(); }),
			switchMap(() => { return this.productService.getProductsCount(); }),
			tap((count) => {
				this.total = count;

				if(this.isToRedirect()) {
					this.selectedPage = Math.ceil(this.total / this.limit);
					this.location.go(`/restful/products/${ this.selectedPage }`);	// only change the URL in browser, not really redirect to the corresponding page.
				}
			}),
			switchMap(() => { return this.productService.getProducts(this.selectedPage, this.limit, this.selectedSortOption); }),
			catchError((error) => {
				this.simpleModalService.open('Error', 'Failed to load the product list.', 2000);

				return of([]);
			}),
			finalize(() => { this.hideLoadingIndicator(); }));

		of(params, refresh)
			.pipe(
				mergeAll(),
				takeUntil(this.terminator),
				switchMap(() => { return source; }))
			.subscribe((products) => {
				this.products = products;
				this.scrollIntoView();
			});
	}

	paginate(page: number): void {
		this.navigateTo(page);
	}

	refresh(): void {
		this.navigateTo(this.selectedPage);
	}

	edit(product: Product): void {
		this.router.navigate(['/restful/product/edit', product.id]);
	}

	create(): void {
		this.router.navigate(['/restful/product/create']);
	}

	sort(sortOption: string): void {
		this.configOptionalRouteParams('sortedBy', (sortOption !== this.DEFAULT_SORT_OPTION) ? sortOption : undefined);
		this.navigateTo(this.selectedPage);
	}

	delete(product: Product): void {
		const confirmModalRef = this.confirmModalService.open('Delete a product', 'Please confirm to delete the product.');

		confirmModalRef.response
			.pipe(
				takeUntil(this.terminator),
				filter((confirm) => { return confirm }),
				switchMap((confirm) => { return this.productService.deleteProduct(product.id); }),
				catchError((error) => {
					this.simpleModalService.open('Error', 'Failed to delete the product.', 2000);

					return throwError(error);
				}))
			.subscribe(() => {
				if(this.products.length > 1) {
					this.navigateTo(this.selectedPage);
				}
				else if(this.products.length == 1) {
					this.products = [];
					this.navigateTo(this.selectedPage > 1 ? --this.selectedPage : this.selectedPage);
				}
			});
	}

	navigateTo(page: number): void {
		this.router.navigate(['restful/products', page, this.optionalRouteParams]);
	}

	configOptionalRouteParams(key: string, value?: any): void {
		value !== undefined ?
			this.optionalRouteParams[key] = value :
			this.optionalRouteParams = _.omit(this.optionalRouteParams, [key]);
	}

	isToRedirect(): boolean {
		const previousUrl = this.routeTracerService.previousUrl?.split('/');
		const currentUrl = this.routeTracerService.currentUrl?.split('/');

		const condition1 = previousUrl && (previousUrl[2] == 'product') && (previousUrl[3] == 'create');
		const condition2 = currentUrl && (currentUrl[2] == 'products') && (currentUrl[3] == '0');

		if(condition1 && condition2) { return true; }

		return false;
	}

	showLoadingIndicator(): void {
		this.loadingTimer = setTimeout(() => {
			this.loadingModalRef = this.modalService.open(LoadingComponent);
			this.loadingModalRefs.push(this.loadingModalRef);
		}, 500);
	}

	hideLoadingIndicator(): void {
		clearTimeout(this.loadingTimer);
		this.loadingModalRefs.forEach((loadingModalRef) => { loadingModalRef.close(); });
		this.loadingModalRefs = [];
	}

	scrollIntoView(): void {
		const id = this.mapService.get('productId');
		this.mapService.delete('productId');

		if(id !== undefined) {
			window.requestAnimationFrame(() => {
				const target = this.element.querySelector(`[data-stamp='${ id }']`);

				if(target) {
					const top = target.getBoundingClientRect().top;
					const left = target.getBoundingClientRect().left;
					const offset = this.element.parentElement.getBoundingClientRect().top;

					this.scrollService.scrollToPosition([(top - offset), left]);
				}
			});
		}
	}
}
