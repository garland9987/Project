import { Directive, ElementRef, OnInit, AfterContentInit, HostListener, Renderer2, Input, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import * as _ from 'lodash-es';
import { SortableItemDirective } from './sortable-item.directive';
import { BaseDirective } from '@shared/directive/base/base.directive';

@Directive({
	selector: '[appSortableContainer]'
})
export class SortableContainerDirective extends BaseDirective implements OnInit, AfterContentInit {

	private closest: any = null;

	@Input() appSortableContainer: any[];
	@Output() appSortableContainerChange = new EventEmitter<any[]>();

	@ContentChildren(SortableItemDirective)
	sortableItemDirectives: QueryList<SortableItemDirective>;

	constructor(private elementRef: ElementRef,
				private renderer: Renderer2) {
		super();
	}

	get element(): HTMLElement { return this.elementRef.nativeElement; }

	ngOnInit() {
		this.renderer.addClass(this.element, 'sortable-container');
	}

	ngAfterContentInit() {
		this.setSortableItem();

		this.sortableItemDirectives.changes
			.pipe(takeUntil(this.terminator))
			.subscribe(() => {
				setTimeout(() => { this.setSortableItem(); }, 0);
			});
	}

	setSortableItem(): void {
		this.sortableItemDirectives.forEach((sortableItemDirective, index) => {
			sortableItemDirective.index = index;
			sortableItemDirective.item = this.appSortableContainer[index];
		});
	}

	@HostListener('sortableend', ['$event'])
	sortableend(event): void {
		if(this.closest === null) return;

		let item = event.detail.item;
		let previousIndex = event.detail.index;
		let insertBeforeIndex = this.closest.index;

		let newItems = _.clone(this.appSortableContainer);

		if(insertBeforeIndex === undefined) {
			newItems.splice(previousIndex, 1);
			newItems.push(item);
		}
		else if(previousIndex < insertBeforeIndex) {
			newItems.splice(insertBeforeIndex, 0, item);
			newItems.splice(previousIndex, 1);
		}
		else if(previousIndex > insertBeforeIndex) {
			newItems.splice(previousIndex, 1);
			newItems.splice(insertBeforeIndex, 0, item);
		}

		this.closest = null;
		this.appSortableContainerChange.emit(newItems);
	}

	@HostListener('sortabledragging', ['$event'])
	sortabledragging(event): void {
		if(this.isCursorInLimits(this.element, [event.detail.clientX, event.detail.clientY])) {
			this.closest = this.findPosition(this.sortableItemDirectives, event.detail.clientY);

			let dragging = event.detail.element;
			let target = this.closest.element;

			target ? this.renderer.insertBefore(this.element, dragging, target) : this.renderer.appendChild(this.element, dragging);
		}
	}

	findPosition(sortableItemDirectives: QueryList<SortableItemDirective>, clientY: number): any {
		const sortables: { element: HTMLElement; index: number }[] = [];

		sortableItemDirectives.forEach((sortableItemDirective, index) => {
			if(!sortableItemDirective.isDragging) {
				sortables.push({ element: sortableItemDirective.element, index });
			}
		});

		const closest = _.reduce(sortables, (closest, sortable) => {
			let sortableRect = sortable.element.getBoundingClientRect();
			let offset = (sortableRect.bottom - (sortableRect.height / 2)) - clientY;

			return (offset > 0 && offset < closest.offset) ? { sortable, offset } : closest;

		}, { sortable: null, offset: Number.POSITIVE_INFINITY });

		return closest.sortable ? { element: closest.sortable.element, index: closest.sortable.index } : { element: null, index: undefined };
	}

	// items will reorder only when the cursor hovers over the element
	isCursorInLimits(element: HTMLElement, point: [number, number]): boolean {
		const top = element.getBoundingClientRect().top;
		const left = element.getBoundingClientRect().left;
		const bottom = element.getBoundingClientRect().bottom;
		const right = element.getBoundingClientRect().right;

		const clientX = point[0];
		const clientY = point[1];

		if((clientX >= left) && (clientX <= right) && (clientY >= top) && (clientY <= bottom)) return true;

		return false;
	}
}
