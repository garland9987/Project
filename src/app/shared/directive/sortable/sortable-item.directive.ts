import { Directive, ElementRef, Inject, OnInit, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, of } from 'rxjs';
import { switchMap, takeUntil, withLatestFrom, tap, mergeAll } from 'rxjs/operators';

import { BaseDirective } from '@shared/directive/base/base.directive';

@Directive({
	selector: '[appSortableItem]'
})
export class SortableItemDirective extends BaseDirective implements OnInit, AfterViewInit {

	// both index and item are assigned by the SortableContainerDirective
	public index: number;
	public item: any;

	public isDragging: boolean = false;
	public originalCoordinate: [number, number];

	constructor(private elementRef: ElementRef,
				private renderer: Renderer2,
				@Inject(DOCUMENT) private document: Document) {
		super();
	}

	get element(): HTMLElement { return this.elementRef.nativeElement; }

	ngOnInit() {
		this.renderer.addClass(this.element, 'sortable-item');
	}

	ngAfterViewInit() {
		const clone = this.element.cloneNode(true) as HTMLElement;

		// prevent the page from scrolling when an element is being dragged
		const preventMouseDefault = (event: MouseEvent) => { event.preventDefault(); };
		const preventTouchDefault = (event: TouchEvent) => { event.preventDefault(); };

		const mousedown = fromEvent<MouseEvent>(this.element, 'mousedown').pipe(tap(preventMouseDefault));
		const mousemove = fromEvent<MouseEvent>(this.document, 'mousemove').pipe(tap(preventMouseDefault));
		const mouseup = fromEvent<MouseEvent>(this.document, 'mouseup').pipe(tap(preventMouseDefault));

		const touchstart = fromEvent<TouchEvent>(this.element, 'touchstart').pipe(tap(preventTouchDefault));
		const touchmove = fromEvent<TouchEvent>(this.document, 'touchmove').pipe(tap(preventTouchDefault));
		const touchend = fromEvent<TouchEvent>(this.document, 'touchend').pipe(tap(preventTouchDefault));

		const mouseDraggable = mousedown.pipe(
			tap(() => { this.startDragging(this.document.body, this.element, clone); }),
			switchMap(() => {
				return mousemove.pipe(
					tap((event: MouseEvent) => { this.dispatchSortableDraggingEvent(this.element, event); }),
					takeUntil(mouseup.pipe(tap(() => {
						this.endDragging(this.document.body, this.element, clone);
						this.dispatchSortableEndEvent(this.element, this.index, this.item);
					})))
				);
			}),
			withLatestFrom(mousedown, (move: MouseEvent, down: MouseEvent) => {
				return {
					x: (move.clientX - down.clientX),
					y: (move.clientY - down.clientY)
				}
			}));

		const touchDraggable = touchstart.pipe(
			tap(() => { this.startDragging(this.document.body, this.element, clone); }),
			switchMap(() => {
				return touchmove.pipe(
					tap((event: TouchEvent) => { this.dispatchSortableDraggingEvent(this.element, event); }),
					takeUntil(touchend.pipe(tap(() => {
						this.endDragging(this.document.body, this.element, clone);
						this.dispatchSortableEndEvent(this.element, this.index, this.item);
					})))
				);
			}),
			withLatestFrom(touchstart, (move: TouchEvent, start: TouchEvent) => {
				return {
					x: (move.touches[0].clientX - start.touches[0].clientX),
					y: (move.touches[0].clientY - start.touches[0].clientY)
				}
			}));

		of(mouseDraggable, touchDraggable)
			.pipe(
				takeUntil(this.terminator),
				mergeAll())
			.subscribe((event) => {
				this.renderer.setStyle(clone, 'transform', `translate(${ event.x }px, ${ event.y }px)`);
			});
	}

	startDragging(body: HTMLElement, element: HTMLElement, clone: HTMLElement): void {
		this.isDragging = true;
		this.originalCoordinate = [element.getBoundingClientRect().left, element.getBoundingClientRect().top];

		// dimension
		this.renderer.setStyle(clone, 'box-sizing', `${ getComputedStyle(element).getPropertyValue('box-sizing') }`);
		this.renderer.setStyle(clone, 'width', `${ element.offsetWidth }px`);
		this.renderer.setStyle(clone, 'height', `${ element.offsetHeight }px`);
		// position
		this.renderer.setStyle(clone, 'position', 'fixed');
		this.renderer.setStyle(clone, 'z-index', '1');
		this.renderer.setStyle(clone, 'left', `${ element.getBoundingClientRect().left }px`);	// translate in x-axis is based on 'left'
		this.renderer.setStyle(clone, 'top', `${ element.getBoundingClientRect().top }px`);		// translate in y-axis is based on 'top'
		// appearance
		this.renderer.addClass(clone, 'sortable-shadow');

		body.appendChild(clone);
	}

	endDragging(body: HTMLElement, element: HTMLElement, clone: HTMLElement): void {
		this.isDragging = false;

		// calculate the offset between the new position and the original position
		// realize the animation that the shadow moves to the new position when drag action is finished
		const endPointLeft = element.getBoundingClientRect().left - this.originalCoordinate[0];
		const endPointTop = element.getBoundingClientRect().top - this.originalCoordinate[1];
		const duration = 500;

		this.renderer.setStyle(clone, 'transition', `transform ${ duration }ms`);
		this.renderer.setStyle(clone, 'transform', `translate(${ endPointLeft }px, ${ endPointTop }px)`);

		setTimeout(() => {
			body.removeChild(clone);

			this.renderer.removeStyle(clone, 'box-sizing');
			this.renderer.removeStyle(clone, 'width');
			this.renderer.removeStyle(clone, 'height');
			this.renderer.removeStyle(clone, 'position');
			this.renderer.removeStyle(clone, 'z-index');
			this.renderer.removeStyle(clone, 'left');
			this.renderer.removeStyle(clone, 'top');
			this.renderer.removeStyle(clone, 'transform');
			this.renderer.removeStyle(clone, 'transition');
			this.renderer.removeClass(clone, 'sortable-shadow');
		}, duration);
	}

	dispatchSortableDraggingEvent(element: HTMLElement, event: MouseEvent | TouchEvent): void {
		let detail: any = { element };

		if(event instanceof MouseEvent) { detail = { ...detail, clientX: event.clientX, clientY: event.clientY } }
		if(event instanceof TouchEvent) { detail = { ...detail, clientX: event.touches[0].clientX, clientY: event.touches[0].clientY } }

		element.dispatchEvent(new CustomEvent('sortabledragging', { bubbles: true, detail }));
	}

	dispatchSortableEndEvent(element: HTMLElement, index: number, item: any): void {
		let detail: any = { index, item };

		element.dispatchEvent(new CustomEvent('sortableend', { bubbles: true, detail }));
	}
}
