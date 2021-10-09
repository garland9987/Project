import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

import * as moment from 'moment';
import { Moment } from 'moment';

interface IDate {
	date: number;
	valid: boolean;
	month: string;
}

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {
	@Input() calendar: string = '';
	@Output() calendarDateChange = new EventEmitter<string>();		// use when date is changed
	@Output() calendarMonthChange = new EventEmitter<string>();		// use when either year or month is changed

	public date: number;
	public month: number;
	public year: number;

	public getFocused: boolean = false;
	public weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	public months: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

	public mode: string = 'standard';
	public center: number;
	public selectedYear: number;
	public selectedMonth: number;

	constructor(private elementRef: ElementRef) {}

	get element(): HTMLElement { return this.elementRef.nativeElement.querySelector('div.calendar'); }

	ngOnInit(): void {
		this.setStatus();
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.setStatus();
	}

	setStatus(): void {
		const mt = moment(this.calendar, 'YYYY-MM-DD', true).isValid() ? moment(this.calendar, 'YYYY-MM-DD', true) : moment();

		[this.year, this.month, this.date] = [mt.year(), mt.month(), mt.date()];

		this.mode = 'standard';
		this.selectedYear = 0;
		this.selectedMonth = 0;
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

	get dates(): IDate[] {
		return [
			...this.getPrevDates(this.year, this.month, this.date),
			...this.getCurrentDates(this.year, this.month, this.date),
			...this.getNextDates(this.year, this.month, this.date)];
	}

	getCurrentDates(year: number, month: number, date: number): IDate[] {
		const dates: IDate[] = [];
		const start: number = 1;
		const end: number = moment([year, month, date]).daysInMonth();

		for(let date = start; date <= end; date++) {
			dates.push({ date: date, valid: true, month: 'current' });
		}

		return dates;
	}

	// 'Sun'=0, 'Mon'=1, 'Tue'=2, 'Wed'=3, 'Thu'=4, 'Fri'=5, 'Sat'=6
	getPrevDates(year: number, month: number, date: number): IDate[] {
		const dates: IDate[] = [];

		const prevMonth: Moment = moment([year, month, date]).subtract(1, 'months').endOf('month');
		const weekday: number = prevMonth.day();

		if(weekday === 6) return dates;

		const start: number = prevMonth.clone().day(0).date();
		const end: number = prevMonth.date();

		for(let date = start; date <= end; date++) {
			dates.push({ date: date, valid: false, month: 'previous' });
		}

		return dates;
	}

	// 'Sun'=0, 'Mon'=1, 'Tue'=2, 'Wed'=3, 'Thu'=4, 'Fri'=5, 'Sat'=6
	getNextDates(year: number, month: number, date: number): IDate[] {
		let dates: IDate[] = [];

		const nextMonth: Moment = moment([year, month, date]).add(1, 'months').startOf('month');
		const weekday: number = nextMonth.day();

		if(weekday === 0) return dates;

		const start: number = nextMonth.date();
		const end: number = nextMonth.clone().day(6).date();

		for(let date = start; date <= end; date++) {
			dates.push({ date: date, valid: false, month: 'next' });
		}

		return dates;
	}

	styleDate(date: IDate): {[property: string]: boolean} {
		return {
			'valid-date': date.valid,
			'invalid-date': !date.valid,
			'selected-date': date.valid && (date.date === this.date)
		}
	}

	selectDate(date: IDate): void {
		const mt = moment([this.year, this.month, this.date]);

		switch(date.month) {
			case 'current':
				mt.date(date.date);
				break;
			case 'previous':
				mt.subtract(1, 'months').date(date.date);
				break;
			case 'next':
				mt.add(1, 'months').date(date.date);
				break;
		}

		[this.year, this.month, this.date] = [mt.year(), mt.month(), mt.date()];

		this.calendarDateChange.emit(mt.format('YYYY-MM-DD'));
	}

	today(): void {
		this.calendarDateChange.emit(moment().format('YYYY-MM-DD'));
	}

	prevMonth(): void {
		const mt = moment([this.year, this.month, this.date]).subtract(1, 'months');
		[this.year, this.month, this.date] = [mt.year(), mt.month(), mt.date()];

		this.calendarMonthChange.emit(mt.format('YYYY-MM-DD'));
	}

	nextMonth(): void {
		const mt = moment([this.year, this.month, this.date]).add(1, 'months');
		[this.year, this.month, this.date] = [mt.year(), mt.month(), mt.date()];

		this.calendarMonthChange.emit(mt.format('YYYY-MM-DD'));
	}

	// ensure the *ngFor directive to work properly
	indexTracker(index: number, value: any) { return index; }

	changeMode(mode: string): void {
		this.mode = mode;

		switch(this.mode) {
			case 'advanced':
				this.center = this.year;
				this.selectedYear = this.year;
				this.selectedMonth = this.month;
				this.scrollIntoView(this.year);
				break;
			case 'standard':
				break;
		}
	}

	isOriginalMonth(year: number, month: number): boolean {
		return (year === this.year) && (month === this.month);
	}

	selectYear(year: number): void {
		this.center = year;
		this.selectedYear = year;
		this.scrollIntoView(this.selectedYear);
	}

	selectMonth(month: number): void {
		this.selectedMonth = month;

		this.year = this.selectedYear;
		this.month = this.selectedMonth;
		this.changeMode('standard');

		this.calendarMonthChange.emit(moment([this.year, this.month, this.date]).format('YYYY-MM-DD'));
	}

	get years(): number[] {
		return this.calcYears(this.center, 200);
	}

	calcYears(center: number, radius: number): number[] {
		let years: number[] = [];

		let start: number = center - radius;
		let end: number = center + radius;

		for(let year = start; year <= end; year++) years.push(year);

		return years;
	}

	moveCenterUp(center: number, radius: number, offset: number, min: number): number {
		return (center - offset - radius) < min ? (min + radius) : (center - offset);
	}

	moveCenterDown(center: number, radius: number, offset: number, max: number): number {
		return (center + offset + radius) > max ? (max - radius) : (center + offset);
	}

	scroll(event): void {
		const element = event.target;

		if(element.scrollTop <= 1000) {
			this.center = this.moveCenterUp(this.center, 200, 200, 1);
		}
		else if((element.scrollHeight - (element.scrollTop + element.clientHeight)) <= 1000) {
			this.center = this.moveCenterDown(this.center, 200, 200, 9999);
		}
	}

	scrollIntoView(year: number): void {
		window.requestAnimationFrame(() => {
			const container = this.element.querySelector('.years') as HTMLElement;
			const target = this.element.querySelector(`[data-stamp='${year}']`) as HTMLElement;

			// container.scrollLeft = target.offsetLeft;
			// container.scrollTop = target.offsetTop;
			container.scrollTo({
				top: target.offsetTop,
				left: target.offsetLeft,
				behavior: 'auto'
			});
		});
	}
}
