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

		const mousedown = fromEvent<MouseEvent>(this.element, 'mousedown');
		const mousemove = fromEvent<MouseEvent>(this.document, 'mousemove');
		const mouseup = fromEvent<MouseEvent>(this.document, 'mouseup');

		const touchstart = fromEvent<TouchEvent>(this.element, 'touchstart');
		const touchmove = fromEvent<TouchEvent>(this.document, 'touchmove');
		const touchend = fromEvent<TouchEvent>(this.document, 'touchend');

		const mouseDraggable = mousedown.pipe(
			tap(() => { this.startDragging(this.document.body, this.element, clone); }),
			switchMap(() => {
				return mousemove.pipe(
					tap((event: MouseEvent) => { this.dispatchSortableDraggingEvent(this.element, event); }),
					takeUntil(mouseup.pipe(tap(() => {
						this.endDragging(this.document.body, clone);
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
						this.endDragging(this.document.body, clone);
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

		// dimension
		this.renderer.setStyle(clone, 'width', `${ element.offsetWidth }px`);
		this.renderer.setStyle(clone, 'height', `${ element.offsetHeight }px`);
		// position
		this.renderer.setStyle(clone, 'position', 'fixed');
		this.renderer.setStyle(clone, 'z-index', '1');
		this.renderer.setStyle(clone, 'left', `${ element.getBoundingClientRect().left }px`);
		this.renderer.setStyle(clone, 'top', `${ element.getBoundingClientRect().top }px`);
		// appearance
		this.renderer.addClass(clone, 'sortable-shadow');

		body.appendChild(clone);
	}

	endDragging(body: HTMLElement, clone: HTMLElement): void {
		this.isDragging = false;

		body.removeChild(clone);

		this.renderer.removeStyle(clone, 'width');
		this.renderer.removeStyle(clone, 'height');
		this.renderer.removeStyle(clone, 'position');
		this.renderer.removeStyle(clone, 'z-index');
		this.renderer.removeStyle(clone, 'left');
		this.renderer.removeStyle(clone, 'top');
		this.renderer.removeStyle(clone, 'transform');
		this.renderer.removeClass(clone, 'sortable-shadow');
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
