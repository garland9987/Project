import { Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[appDraggableHandle]'
})
export class DraggableHandleDirective {

	constructor(private elementRef: ElementRef) {}

	get element(): HTMLElement { return this.elementRef.nativeElement; }
}
