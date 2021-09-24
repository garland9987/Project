import { Directive, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

type MenuItem = 'left' | 'right' | 'divider' | '';

@Directive({
	selector: '[appMenuItem]'
})
export class MenuItemDirective implements OnInit {

	@Input('appMenuItem') direction: MenuItem = '';

	constructor(private elementRef: ElementRef,
				private renderer: Renderer2) {}

	get element() { return this.elementRef.nativeElement; }

	ngOnInit() {
		this.renderer.addClass(this.element, 'menu-item');

		switch(this.direction) {
			case 'left':
				this.renderer.addClass(this.element, 'menu-item-left');
				break;
			case 'right':
				this.renderer.addClass(this.element, 'menu-item-right');
				break;
			case 'divider':
				this.renderer.addClass(this.element, 'menu-item-divider');
				break;
		}
	}
}
