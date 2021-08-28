import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { of, throwError } from 'rxjs';
import { takeUntil, tap, map, filter, switchMap, catchError } from 'rxjs/operators';

import { BaseComponent } from '@shared/component/base/base.component';
import { Product } from '@shared/model/product';
import { ProductService } from '@core/restful/product/product.service';
import { SimpleModalService, ConfirmModalService } from '@core/module/modal';
import { RouteTracerService } from '@core/service/route-tracer/route-tracer.service';
import { MapService } from '@core/service/map/map.service';

@Component({
	selector: 'app-product-edit',
	templateUrl: './product-edit.component.html',
	styleUrls: ['./product-edit.component.scss'],
	providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class ProductEditComponent extends BaseComponent implements OnInit{
	public id: number;
	public product: Product;
	public formGroup: FormGroup;

	constructor(private router: Router,
				private activatedRoute: ActivatedRoute,
				private location: Location,
				private formBuilder: FormBuilder,
				private productService: ProductService,
				private simpleModalService: SimpleModalService,
				private confirmModalService: ConfirmModalService,
				private routeTracerService: RouteTracerService,
				private mapService: MapService) {
		super();
	}

	ngOnInit() {
		this.activatedRoute.paramMap
			.pipe(
				takeUntil(this.terminator),
				map((params) => { return Number(params.get('id')); }),
				tap((id) => { this.id = id; }),
				switchMap((id) => { return this.productService.getProduct(id); }),
				catchError((error) => {
					this.simpleModalService.open('Error', 'Failed to load the product.', 2000);

					return of(null);
				}))
			.subscribe((product: Product) => {
				this.product = product;
				this.initForm(product);
				this.mapService.set('productId', this.product.id);
			});
	}

	initForm(product: Product): void {
		this.formGroup = this.formBuilder.group({
			name: [product?.name, [Validators.required]],
			price: [product?.price, [Validators.required, Validators.pattern('^(0|([1-9][0-9]*))(\\.[0-9]+)*$')]],
			quantity: [product?.quantity, [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]],
			description: [product?.description, [Validators.required]],
			image: ['']
		});
	}

	get name() { return this.formGroup.get('name') as FormControl; }
	get price() { return this.formGroup.get('price') as FormControl; }
	get quantity() { return this.formGroup.get('quantity') as FormControl; }
	get description() { return this.formGroup.get('description') as FormControl; }
	get image() { return this.formGroup.get('image') as FormControl; }

	save(): void {
		this.isSubmitted = true;

		if(this.formGroup.valid) {
			this.syncProduct();
			this.productService.updateProduct(this.product)
				.pipe(
					catchError((error) => {
						this.simpleModalService.open('Error', 'Failed to update the product.', 2000);

						return throwError(error);
					}))
				.subscribe((product: Product) => {
					this.simpleModalService.open('Success', 'Update the product successfully.', 2000);

					this.product = product;
					this.initForm(product);
					this.isSubmitted = false;
				});
		}
	}

	syncProduct(): void {
		this.product.name = this.name.value;
		this.product.price = this.price.value;
		this.product.quantity = this.quantity.value;
		this.product.description = this.description.value;
		this.product.imageUrl = this.image.value ? this.image.value : this.product.imageUrl;
	}

	delete(): void {
		const confirmModalRef = this.confirmModalService.open('Delete a product', 'Please confirm to delete the product.');

		confirmModalRef.response
			.pipe(
				takeUntil(this.terminator),
				filter((confirm) => { return confirm; }),
				switchMap((confirm) => { return this.productService.deleteProduct(this.product.id); }),
				catchError((error) => {
					this.simpleModalService.open('Error', 'Failed to delete the product.', 2000);

					return throwError(error);
				}))
			.subscribe(() => {
				this.back();
			});
	}

	back(): void {
		this.location.back();
	}
}
