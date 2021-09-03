import { Directive, ElementRef, Inject, AfterContentInit, AfterViewInit, Renderer2, ContentChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, of } from 'rxjs';
import { switchMap, takeUntil, withLatestFrom, tap, mergeAll } from 'rxjs/operators';

import { BaseDirective } from '@shared/directive/base/base.directive';
import { DraggableHandleDirective } from './draggable-handle.directive';

@Directive({
	selector: '[appDraggable]'
})
export class DraggableDirective extends BaseDirective implements AfterContentInit, AfterViewInit {

	public handle: HTMLElement;

	@ContentChild(DraggableHandleDirective)
	draggableHandleDirective: DraggableHandleDirective;

	constructor(private elementRef: ElementRef,
				private renderer: Renderer2,
				@Inject(DOCUMENT) private document: Document) {
		super();
	}

	get element(): HTMLElement { return this.elementRef.nativeElement; }

	ngAfterContentInit() {
		if(this.draggableHandleDirective !== undefined) {
			this.handle = this.draggableHandleDirective.element;
		}

		this.renderer.setStyle(this.handle ? this.handle : this.element, 'cursor', 'move');
	}

	ngAfterViewInit() {
		const mousedown = fromEvent<MouseEvent>(this.handle ? this.handle : this.element, 'mousedown');
		const mousemove = fromEvent<MouseEvent>(this.document, 'mousemove');
		const mouseup = fromEvent<MouseEvent>(this.document, 'mouseup');

		const touchstart = fromEvent<TouchEvent>(this.handle ? this.handle : this.element, 'touchstart');
		const touchmove = fromEvent<TouchEvent>(this.document, 'touchmove');
		const touchend = fromEvent<TouchEvent>(this.document, 'touchend');

		let currentX: number = 0;
		let currentY: number = 0;

		const mouseDraggable = mousedown.pipe(
			switchMap(() => {
				return mousemove.pipe(
					takeUntil(mouseup.pipe(tap(() => {
						[currentX, currentY] = this.calcTranslate();
					})))
				);
			}),
			withLatestFrom(mousedown, (move: MouseEvent, down: MouseEvent) => {
				return {
					// translate is relative to the element's original position
					// (down.clientX - currentX) and (down.clientY - currentY) find the corresponding point in the original position
					x: (move.clientX - (down.clientX - currentX)),
					y: (move.clientY - (down.clientY - currentY))
				}
			}));

		const touchDraggable = touchstart.pipe(
			switchMap(() => {
				return touchmove.pipe(
					takeUntil(touchend.pipe(tap(() => {
						[currentX, currentY] = this.calcTranslate();
					})))
				);
			}),
			withLatestFrom(touchstart, (move: TouchEvent, start: TouchEvent) => {
				return {
					x: (move.touches[0].clientX - (start.touches[0].clientX - currentX)),
					y: (move.touches[0].clientY - (start.touches[0].clientY - currentY))
				}
			}));

		of(mouseDraggable, touchDraggable)
			.pipe(
				takeUntil(this.terminator),
				mergeAll())
			.subscribe((event) => {
				this.renderer.setStyle(this.element, 'transform', `translate(${ event.x }px, ${ event.y }px)`);
			});
	}

	calcTranslate(): [number, number] {
		const style = getComputedStyle(this.element);
		const matrix = new DOMMatrixReadOnly(style.transform);

		return [matrix.m41, matrix.m42];
	}
}
