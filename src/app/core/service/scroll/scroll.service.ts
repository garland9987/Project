import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ScrollService {
	public container: HTMLElement;

	setContainer(container: HTMLElement): void {
		this.container = container;
	}

	// return [scrollTop, scrollLeft]
	getScrollPosition(): [number, number] {
		return [this.container.scrollTop, this.container.scrollLeft];
	}

	// argument type: [scrollTop, scrollLeft]
	scrollToPosition(position: [number, number]): void {
		// this.container.scrollTop = position[0];
		// this.container.scrollLeft = position[1];

		this.container.scrollTo({
			top: position[0],
			left: position[1],
			behavior: 'auto'
		});
	}

	scrollToTop(): void {
		this.container.scrollTop = 0;
	}

	scrollToBottom(): void {
		this.container.scrollTop = this.container.scrollHeight;
	}
}
