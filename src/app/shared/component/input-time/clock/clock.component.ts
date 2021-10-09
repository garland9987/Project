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

		this.hours = this.calc(1, 12, this.hour);
		this.minutes = this.calc(0, 59, this.minute);
		this.meridiems = (this.meridiem === 'am') ? ['am', 'pm'] : ['pm', 'am'];

		window.requestAnimationFrame(() => {
			this.element.querySelector('.hour.selected')?.scrollIntoView();
			this.element.querySelector('.minute.selected')?.scrollIntoView();
		});
	}

	/**
	 * Slice the array until the previous element of the selected one
	 * Retain the previous element in order to leave some space above the selected one, allowing user to scroll down at the beginning
	 */
	calc(start: number, end: number, element: string): string[] {
		let array: string[] = [];

		for(let i = start; i <= end; i++) {
			array.push(('0' + i).slice(-2));
		}

		let index: number = array.indexOf(element);
		let slice: string[] = [];

		switch(index) {
			case 0:
				slice = array.slice(-1);
				array.splice(-1, 1);
				array.splice(0, 0, ...slice);

				break;
			case 1:
				// no processing is required
				break;
			default:
				slice = array.slice(0, index - 1);
				array.splice(0, index - 1);
				array.splice(array.length, 0, ...slice);
		}

		return array;
	}

	scrollLoop(event): void {
		let parent = event.target;
		let first = parent.querySelector('div:nth-of-type(1)');
		let last = parent.querySelector('div:nth-last-of-type(1)');

		if(parent.scrollTop <= 64) {
			this.renderer.insertBefore(parent, last, first);
		}
		else if((parent.scrollHeight - (parent.scrollTop + parent.clientHeight)) <= 64) {
			this.renderer.appendChild(parent, first);
		}
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
