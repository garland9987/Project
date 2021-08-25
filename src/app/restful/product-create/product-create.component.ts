import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { throwError } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

import { BaseComponent } from '@shared/component/base/base.component';
import { Product } from '@shared/model/product';
import { ProductService } from '@core/restful/product/product.service';
import { SimpleModalService } from '@core/module/modal';

@Component({
	selector: 'app-product-create',
	templateUrl: './product-create.component.html',
	styleUrls: ['./product-create.component.scss'],
	providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class ProductCreateComponent extends BaseComponent implements OnInit {
	public product: Product = new Product('', 0, 0, '', '');
	public formGroup: FormGroup;

	constructor(private router: Router,
				private location: Location,
				private formBuilder: FormBuilder,
				private productService: ProductService,
				private simpleModalService: SimpleModalService) {
		super();
	}

	ngOnInit() {
		this.initForm();
	}

	initForm(): void {
		this.formGroup = this.formBuilder.group({
			name: ['', [Validators.required]],
			price: ['', [Validators.required, Validators.pattern('^(0|([1-9][0-9]*))(\\.[0-9]+)*$')]],
			quantity: ['', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]],
			description: ['', [Validators.required]],
			image: ['', [Validators.required]]
		});
	}

	get name() { return this.formGroup.get('name') as FormControl; }
	get price() { return this.formGroup.get('price') as FormControl; }
	get quantity() { return this.formGroup.get('quantity') as FormControl; }
	get description() { return this.formGroup.get('description') as FormControl; }
	get image() { return this.formGroup.get('image') as FormControl; }

	create(): void {
		this.isSubmitted = true;

		if(this.formGroup.valid) {
			this.syncProduct();
			this.productService.createProduct(this.product)
				.pipe(
					catchError((error) => {
						this.simpleModalService.open('Error', 'Failed to create a new product.', 2000);

						return throwError(error);
					}))
				.subscribe((product: Product) => {
					this.simpleModalService.open('Success', 'Create a new product successfully.', 2000);

					setTimeout(() => {
						this.router.navigate(['/restful/products/0']);
					}, 2000);
				});
		}
	}

	syncProduct(): void {
		this.product.name = this.name.value;
		this.product.price = this.price.value;
		this.product.quantity = this.quantity.value;
		this.product.description = this.description.value;
		this.product.imageUrl = this.image.value;
	}

	back(): void {
		this.location.back();
	}
}
