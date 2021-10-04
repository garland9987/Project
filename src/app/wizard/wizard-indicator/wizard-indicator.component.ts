import { Component, OnInit, OnChanges, SimpleChanges, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
	selector: 'app-wizard-indicator',
	templateUrl: './wizard-indicator.component.html',
	styleUrls: ['./wizard-indicator.component.scss']
})
export class WizardIndicatorComponent implements OnInit, OnChanges {
	public page1: HTMLElement;
	public page2: HTMLElement;
	public page3: HTMLElement;
	public page4: HTMLElement;
	public page5: HTMLElement;

	public initialized: boolean = false;

	@Input() page: string;

	constructor(private elementRef: ElementRef,
				private renderer: Renderer2) {}

	get element(): HTMLElement { return this.elementRef.nativeElement; }

	ngOnInit(): void {
		this.page1 = this.element.querySelector('div.cell:nth-of-type(1)');
		this.page2 = this.element.querySelector('div.cell:nth-of-type(2)');
		this.page3 = this.element.querySelector('div.cell:nth-of-type(3)');
		this.page4 = this.element.querySelector('div.cell:nth-of-type(4)');
		this.page5 = this.element.querySelector('div.cell:nth-of-type(5)');

		this.initialized = true;
	}

	ngOnChanges(changes: SimpleChanges) {
		if(!this.initialized) return;

		switch(this.page) {
			case '1':
				this.cancelSuccessStatus(this.page1);
				this.cancelSuccessStatus(this.page2);
				this.cancelSuccessStatus(this.page3);
				this.cancelSuccessStatus(this.page4);
				this.cancelSuccessStatus(this.page5);
				break;
			case '2':
				this.cancelSuccessStatus(this.page2);
				this.setSuccessStatus(this.page1);
				break;
			case '3':
				this.cancelSuccessStatus(this.page3);
				this.setSuccessStatus(this.page2);
				break;
			case '4':
				this.cancelSuccessStatus(this.page4);
				this.setSuccessStatus(this.page3);
				break;
			case '5':
				this.cancelSuccessStatus(this.page5);
				this.setSuccessStatus(this.page4);
				break;
			case '0':
				this.setSuccessStatus(this.page5);
				break;
		}
	}

	setSuccessStatus(page: HTMLElement): void {
		this.renderer.addClass(page, 'active');
	}

	cancelSuccessStatus(page: HTMLElement): void {
		this.renderer.removeClass(page, 'active');
	}
}
