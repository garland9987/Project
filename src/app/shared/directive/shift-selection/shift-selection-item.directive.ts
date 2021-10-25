import { Directive, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[appShiftSelectionItem]'
})
export class ShiftSelectionItemDirective {

	constructor(private elementRef: ElementRef) {}

	get element(): HTMLElement { return this.elementRef.nativeElement; }

	@HostListener('mousedown', ['$event'])
	mousedown(event) {
		if(event.shiftKey) {

			this.dispatchShiftSelectionEvent(this.element);
		}
	}

	dispatchShiftSelectionEvent(element: HTMLElement): void {
		element.dispatchEvent(new CustomEvent('shiftselection', { bubbles: true }));
	}
}
