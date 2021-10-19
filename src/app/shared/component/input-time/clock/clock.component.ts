import { Component, OnInit, ElementRef, Renderer2, Input, OnChanges, SimpleChanges, Output, EventEmitter, HostListener } from '@angular/core';

import * as moment from 'moment';

@Component({
	selector: 'app-clock',
	templateUrl: './clock.component.html',
	styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, OnChanges {
	@Input() clock: string = '';
	@Output() clockChange = new EventEmitter<string>();

	public hour: string = '';
	public minute: string = '';
	public meridiem: string = '';

	public hours: string[] = [];				// 01 ~ 12
	public minutes: string[] = [];				// 00 ~ 59
	public meridiems: string[] = ['am', 'pm'];

	public getFocused: boolean = false;
	public clockInit: ClockInit = new ClockInit();

	constructor(private elementRef: ElementRef,
				private renderer: Renderer2) {}

	get element(): HTMLElement { return this.elementRef.nativeElement.querySelector('div.clock'); };

	ngOnInit() {
		this.setStatus();
	}

	ngOnChanges(changes: SimpleChanges) {
		this.setStatus();
	}

	focus(): void { this.element.focus({preventScroll: true}); }
	blur(): void { this.element.blur(); }

	@HostListener('focusin', ['$event'])
	focusin(event) {
		this.getFocused = true;
	}

	@HostListener('focusout', ['$event'])
	focusout(event) {
		this.getFocused = false;
	}

	setStatus(): void {
		const mt = moment(this.clock, 'hh:mm a', true).isValid() ? moment(this.clock, 'hh:mm a', true) : moment();

		[this.hour, this.minute, this.meridiem] = mt.format('hh,mm,a').split(',');

		this.hours = this.clockInit.init(1, 12).rearrange(this.hour).setLeadingElement().value();
		this.minutes = this.clockInit.init(0, 59).rearrange(this.minute).setLeadingElement().value();
		this.meridiems = (this.meridiem === 'am') ? ['am', 'pm'] : ['pm', 'am'];

		window.requestAnimationFrame(() => {
			if(this.clock) {
				const hours = this.element.querySelector('.hours') as HTMLElement;
				const minutes = this.element.querySelector('.minutes') as HTMLElement;

				hours.scrollTop = this.calcItemHeight(hours) * 1;
				minutes.scrollTop = this.calcItemHeight(minutes) * 1;
			}
		});
	}

	calcItemHeight(element: HTMLElement): number {
		return parseFloat(getComputedStyle(element.firstElementChild).getPropertyValue('height'));
	}

	scrollLoop(event, list): void {
		const element = event.target;
		const breakpoint = this.calcItemHeight(element) * 1;

		if(this.checkTopSpace(element, breakpoint)) {
			this[list] = this.moveItemsToTop(this[list]);

			// adjust scroll position if it isn't right
			window.requestAnimationFrame(() => {
				if(this.checkTopSpace(element, breakpoint)) {
					element.scrollTop = element.scrollTop + (this.calcItemHeight(element) * 1);
				}
			});
		}
		else if(this.checkBottomSpace(element, breakpoint)) {
			this[list] = this.moveItemsToBottom(this[list]);

			// adjust scroll position if it isn't right
			window.requestAnimationFrame(() => {
				if(this.checkBottomSpace(element, breakpoint)) {
					element.scrollTop = element.scrollTop - (this.calcItemHeight(element) * 1);
				}
			});
		}
	}

	checkTopSpace(element: HTMLElement, breakpoint: number): boolean {
		return element.scrollTop <= breakpoint;
	}

	checkBottomSpace(element: HTMLElement, breakpoint: number): boolean {
		return (element.scrollHeight - (element.scrollTop + element.clientHeight)) <= breakpoint;
	}

	moveItemsToTop(array: string[]): string[] {
		const section1: string[] = array.slice(-1);
		const section2: string[] = array.slice(0, -1);

		return [...section1, ...section2];
	}

	moveItemsToBottom(array: string[]): string[] {
		const section1: string[] = array.slice(1);
		const section2: string[] = array.slice(0, 1);

		return [...section1, ...section2];
	}

	isHour(hour: string): boolean { return this.hour === hour; }
	isMinute(minute: string): boolean { return this.minute === minute; }
	isMeridiem(meridiem: string): boolean { return this.meridiem === meridiem; }

	selectHour(hour: string): void {
		this.hour = hour;
		this.clockChange.emit(`${this.hour},${this.minute},${this.meridiem}`);
	}

	selectMinute(minute: string): void {
		this.minute = minute;
		this.clockChange.emit(`${this.hour},${this.minute},${this.meridiem}`);
	}

	selectMeridiem(meridiem: string): void {
		this.meridiem = meridiem;
		this.clockChange.emit(`${this.hour},${this.minute},${this.meridiem}`);
	}
}

class ClockInit {
	private array: string[];

	init(start: number, end: number): this {
		this.array = [];

		for(let i = start; i <= end; i++) {
			this.array.push(('0' + i).slice(-2));
		}

		return this;
	}

	rearrange(first: string): this {
		const index: number = this.array.indexOf(first);

		const section1: string[] = this.array.slice(index);
		const section2: string[] = this.array.slice(0, index);

		this.array = [...section1, ...section2];

		return this;
	}

	setLeadingElement(): this {
		const section1: string[] = this.array.slice(-1);
		const section2: string[] = this.array.slice(0, -1);

		this.array = [...section1, ...section2];

		return this;
	}

	value(): string[] { return this.array; }
}
