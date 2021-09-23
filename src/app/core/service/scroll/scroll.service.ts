import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ScrollService {
	public renderer: Renderer2;
	public container: HTMLElement;

	constructor(rendererFactory: RendererFactory2) {
		this.renderer = rendererFactory.createRenderer(null, null);
	}

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

	forbidScrolling(): void {
		this.renderer.setStyle(this.container, 'overflow', 'hidden');
	}

	resumeScrolling(): void {
		this.renderer.removeStyle(this.container, 'overflow');
	}
}
