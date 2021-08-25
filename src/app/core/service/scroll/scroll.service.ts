import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ScrollService {
	private container: HTMLElement;
	private scrollPosition = null;

	setContainer(container: HTMLElement): void {
		this.container = container;
	}

	// return [scrollTop, scrollLeft]
	getScrollPosition(): [number, number] {
		return [this.container.scrollTop, this.container.scrollLeft];
	}

	// argument type: [scrollTop, scrollLeft]
	scrollToPosition(position: [number, number]): void {
		this.container.scrollTop = position[0];
		this.container.scrollLeft = position[1];
	}

	scrollToBottom(): void {
		this.container.scrollTop = this.container.scrollHeight;
	}
}
