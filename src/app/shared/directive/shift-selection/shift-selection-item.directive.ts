import { Directive, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[appShiftSelectionItem]'
})
export class ShiftSelectionItemDirective {
	@Input('appShiftSelectionItem') status: boolean;
	@Output('appShiftSelectionItemChange') statusChange = new EventEmitter<boolean>();

	constructor(private elementRef: ElementRef) {}

	get element(): HTMLInputElement { return this.elementRef.nativeElement; }

	@HostListener('click', ['$event'])
	click(event) {
		if(event.shiftKey) this.dispatchShiftSelectionEvent(this.element);
	}

	dispatchShiftSelectionEvent(element: HTMLElement): void {
		let detail = { element };

		element.dispatchEvent(new CustomEvent('shiftselection', { bubbles: true, detail }));
	}

	setStatus(status: boolean) {
		this.element.checked = status;
		this.statusChange.emit(status);
	}
}
