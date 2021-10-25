import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[appShiftSelectionContainer]'
})
export class ShiftSelectionContainerDirective {

	@HostListener('shiftselection', ['$event'])
	shiftselection(event) {
		console.log('shiftselection');
	}

}
