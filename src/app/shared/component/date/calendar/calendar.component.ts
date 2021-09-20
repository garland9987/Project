import { Component, OnInit, OnChanges, SimpleChange, Input, Output, EventEmitter } from '@angular/core';

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
	@Output() calendarChange = new EventEmitter<string>();

	public date: number;
	public month: number;
	public year: number;

	public weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	ngOnInit(): void {
		this.setStatus();
	}

	ngOnChanges(changes: {[property: string]: SimpleChange}): void {
		this.setStatus();
	}

	setStatus(): void {
		const mt = moment(this.calendar, 'YYYY-MM-DD', true).isValid() ? moment(this.calendar, 'YYYY-MM-DD', true) : moment();

		[this.year, this.month, this.date] = [mt.year(), mt.month(), mt.date()];
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

		this.calendarChange.emit(mt.format('YYYY-MM-DD'));
	}

	today(): void {
		this.calendarChange.emit(moment().format('YYYY-MM-DD'));
	}

	prevMonth(): void {
		const mt = moment([this.year, this.month, this.date]).subtract(1, 'months');
		[this.year, this.month, this.date] = [mt.year(), mt.month(), mt.date()];
	}

	nextMonth(): void {
		const mt = moment([this.year, this.month, this.date]).add(1, 'months');
		[this.year, this.month, this.date] = [mt.year(), mt.month(), mt.date()];
	}

	// ensure the *ngFor directive to work properly
	indexTracker(index: number, value: any) { return index; }
}
