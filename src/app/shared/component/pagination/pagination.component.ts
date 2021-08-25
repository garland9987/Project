import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild, ElementRef, SimpleChange, HostListener } from '@angular/core';

interface Range {
	start: number;
	end: number;
}

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
	public pages: any[];
	public pagesCount: number;

	@Input() total: number;					// the total number of items
	@Input() limit: number;					// the number of items on one page
	@Input() selectedPage: number;			// the selected page
	@Input() displayedCount: number;		// the number of pages expected to be displayed
	@Input() position: string = 'left';		// three options: 'left', 'center' and 'right'

	@Output() selectedPageChange = new EventEmitter<number>();

	@ViewChild('pagination') pagination: ElementRef;

	ngOnInit(): void {
		this.render();
	}

	ngOnChanges(changes: {[property: string]: SimpleChange}): void {
		this.render();
	}

	@HostListener('window:resize', ['$event'])
	windowResize(event) {
		this.render();
	}

	render(): void {
		this.pagesCount = Math.ceil(this.total / this.limit);
		this.pages = this.fillPage(this.calcRange(this.selectedPage, this.displayedCount, this.pagesCount));

		window.requestAnimationFrame(() => {
			this.pages = this.fillPage(this.calcRange(this.selectedPage, this.recalcDisplayedCount(this.pagination.nativeElement), this.pagesCount));
		});
	}

	fillPage(range: { start: number, end: number }): any[] {
		const pages: any[] = [];

		for(let i = range.start; i <= range.end; i++) {
			pages.push(i);
		}

		pages.unshift('<');
		pages.push('>');

		return pages;
	}

	calcRange(selectedPage: number, displayedCount: number, pagesCount: number): Range {
		if(displayedCount >= pagesCount) return { start: 1, end: pagesCount };

		// calculate the number of pages before the selected page
		// calculate the number of pages after the selected page
		const before = Math.floor((displayedCount - 1) / 2);
		const after = Math.ceil((displayedCount - 1) / 2);

		// the boundary is from 1 to pagesCount
		// calculate the number of pages between selectedPage and upper boundary
		// calculate the number of pages between selectedPage and lower boundary
		const upper = selectedPage - 1;
		const lower = pagesCount - selectedPage;

		let start: number;
		let end: number;

		if(upper >= before && lower >= after) {
			start = selectedPage - before;
			end = selectedPage + after;
		}
		else if(upper < before) {
			start = 1;
			end = selectedPage + after + (before - upper);
		}
		else if(lower < after) {
			start = selectedPage - before - (after - lower);
			end = pagesCount;
		}

		return { start, end };
	}

	selectPage(page: any): void {
		switch(page) {
		case '<':
			if(this.selectedPage > 1) --this.selectedPage;
			break;
		case '>':
			if(this.selectedPage < this.pagesCount) ++this.selectedPage;
			break;
		default:
			this.selectedPage = page;
		}

		this.selectedPageChange.emit(this.selectedPage);
		this.render();
	}

	setPosition(): {[property: string]: boolean} {
		return {
			'justify-content-start': this.position === 'left',
			'justify-content-center': this.position === 'center',
			'justify-content-end': this.position === 'right'
		};
	}

	recalcDisplayedCount(parent: HTMLElement): number {
		const parentWidth = this.getContentWidth(parent);
		const children = ([...parent.children] as HTMLElement[]).reverse();	// e.g. '15' is wider than '5'

		let childrenWidth = 0;
		let childrenCount = 0;

		for(let child of children) {
			childrenWidth += child.offsetWidth;

			if(parentWidth >= childrenWidth) {
				++childrenCount;
			}
			else {
				break;
			}
		}

		return (childrenCount - 2); // reserved spaces for '<' and '>'
	}

	getContentWidth(element: HTMLElement): number {
		const styles = getComputedStyle(element);

		return element.clientWidth
			- parseFloat(styles.getPropertyValue('padding-left'))
			- parseFloat(styles.getPropertyValue('padding-right'));
	}
}
