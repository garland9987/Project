import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash-es';

@Pipe({
	name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

	transform(value: any[], property: string): any[] {

		if(!_.isArray(value)) return value;

		return property === 'default' ? value : _.sortBy(value, [property]);
	}
}
