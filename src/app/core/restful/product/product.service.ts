import { Injectable } from '@angular/core';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { productUrl } from '@shared/global/variable';
import { RestfulService } from '@core/restful/restful.service';
import { Product } from '@shared/model/product';

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	constructor(private restfulService: RestfulService) {}

	getProducts(page: number, limit: number): Observable<Product[]> {
		const verb = 'GET';
		const url = productUrl;
		const options = { params: new HttpParams({ fromString: `page=${ page }&limit=${ limit }` }) };

		return this.restfulService.sendRequest<Product[]>(verb, url, options);
	}

	getProductsCount(): Observable<number> {
		const verb = 'GET';
		const url = `${ productUrl }/count`;

		return this.restfulService.sendRequest<number>(verb, url);
	}

	getProduct(id: number): Observable<Product> {
		const verb = 'GET';
		const url = `${ productUrl }/${ id }`;

		return this.restfulService.sendRequest<Product>(verb, url);
	}

	deleteProduct(id: number): Observable<Product> {
		const verb = 'DELETE';
		const url = `${ productUrl }/${ id }`;

		return this.restfulService.sendRequest<Product>(verb, url);
	}

	updateProduct(product: Product): Observable<Product> {
		const verb = 'PUT';
		const url = `${ productUrl }/${ product.id }`;
		const options = { body: product };

		return this.restfulService.sendRequest<Product>(verb, url, options);
	}

	createProduct(product: Product): Observable<Product> {
		const verb = 'POST';
		const url = productUrl;
		const options = { body: product };

		return this.restfulService.sendRequest<Product>(verb, url, options);
	}
}
