import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'namespace'
})
export class NamespacePipe implements PipeTransform {

	transform(value: string, namespace: string): string {
		return namespace.concat('.', value);
	}
}
