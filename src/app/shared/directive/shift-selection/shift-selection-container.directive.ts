import { Directive, HostListener, ContentChildren, QueryList } from '@angular/core';

import { ShiftSelectionItemDirective } from './shift-selection-item.directive';

@Directive({
	selector: '[appShiftSelectionContainer]'
})
export class ShiftSelectionContainerDirective {
	@ContentChildren(ShiftSelectionItemDirective, { descendants: true })
	shiftSelectionItemDirectives: QueryList<ShiftSelectionItemDirective>;

	@HostListener('shiftselection', ['$event'])
	shiftselection(event) {
		let collection: ShiftSelectionItemDirective[] = [];
		let target = event.detail.element;

		for(let shiftSelectionItemDirective of this.shiftSelectionItemDirectives) {
			let element = shiftSelectionItemDirective.element;

			if((element !== target) && (element.checked === target.checked)) {
				collection = [];
				collection.push(shiftSelectionItemDirective);
			}
			else if((element !== target) && (element.checked !== target.checked) && (collection.length !== 0)) {
				collection.push(shiftSelectionItemDirective);
			}
			else if(element === target) {
				collection.push(shiftSelectionItemDirective);
				break;
			}
		}

		collection.forEach((shiftSelectionItemDirective) => {
			shiftSelectionItemDirective.setStatus(target.checked);
		});
	}
}
