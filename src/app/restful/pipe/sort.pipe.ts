import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'sort'
})
export class SortPipe implements PipeTransform {

	transform(value: string): string {
		switch (value) {
			case 'id': return 'Default';
			case 'price': return 'Price';
			case 'quantity': return 'Quantity';
			default: return value;
		}
	}
}
