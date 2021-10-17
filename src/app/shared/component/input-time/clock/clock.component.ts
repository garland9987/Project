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

		this.hours = this.assign(1, 12);
		this.minutes = this.assign(0, 59);
		this.meridiems = (this.meridiem === 'am') ? ['am', 'pm'] : ['pm', 'am'];

		window.requestAnimationFrame(() => {
			const hours = this.element.querySelector('.hours') as HTMLElement;
			const hour = this.element.querySelectorAll('.hour.selected')[1] as HTMLElement;

			const minutes = this.element.querySelector('.minutes') as HTMLElement;
			const minute = this.element.querySelectorAll('.minute.selected')[1] as HTMLElement;

			hours?.scrollTo({
				top: hour.offsetTop,
				left: hour.offsetLeft,
				behavior: 'auto'
			});

			minutes?.scrollTo({
				top: minute.offsetTop,
				left: minute.offsetLeft,
				behavior: 'auto'
			});
		});
	}

	assign(start: number, end: number): string[] {
		let array: string[] = [];

		for(let i = start; i <= end; i++) {
			array.push(('0' + i).slice(-2));
		}

		return [...array, ...array, ...array];
	}

	scrollLoop(event): void {
		const parent = event.target;

		if(parent.scrollTop <= 64) {
			this.transfer(parent, 'top');
		}
		else if((parent.scrollHeight - (parent.scrollTop + parent.clientHeight)) <= 64) {
			this.transfer(parent, 'bottom');
		}
	}

	transfer(parent: HTMLElement, direction: string): void {
		window.requestAnimationFrame(() => {
			this.hours.unshift('a', 'b', 'c');

			window.requestAnimationFrame(() => {
				parent.scrollTop = parent.scrollTop + 96;
			});
		});

		// window.requestAnimationFrame(() => {
		// 	const count = parent.children.length / 3;

		// 	for(let i = 1; i <= count; i++) {
		// 		if(direction === 'top') this.renderer.insertBefore(parent, parent.lastElementChild, parent.firstElementChild);
		// 		if(direction === 'bottom') this.renderer.appendChild(parent, parent.firstElementChild);
		// 	}
		// });
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
