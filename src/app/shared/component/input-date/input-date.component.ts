import { Component, ViewChild, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import * as moment from 'moment';

import { DateSectionComponent } from './date-section/date-section.component';
import { MonthSectionComponent } from './month-section/month-section.component';
import { YearSectionComponent } from './year-section/year-section.component';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
	selector: 'app-input-date',
	templateUrl: './input-date.component.html',
	styleUrls: ['./input-date.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: InputDateComponent,
		multi: true
	}]
})
export class InputDateComponent implements ControlValueAccessor {
	public initialized: boolean = false;
	public touched: boolean = false;
	public showCalendar: boolean = false;

	public date: string = '';
	public month: string = '';
	public year: string = '';
	public calendar: string = '';

	public onChange = (value: string) => {};
	public onTouched = () => {};

	@ViewChild(DateSectionComponent) dateSectionComponent: DateSectionComponent;
	@ViewChild(MonthSectionComponent) monthSectionComponent: MonthSectionComponent;
	@ViewChild(YearSectionComponent) yearSectionComponent: YearSectionComponent;
	@ViewChild(CalendarComponent) calendarComponent: CalendarComponent;

	// pass the initial value from the parent form (by ngModal or formControlName)
	writeValue(value: string) {
		this.isValid(value) ? this.setStatus(value) : this.setStatus('');
	}

	// pass the new value back to the parent form (received by ngModal or formControlName)
	// save the callback function in a property 'onChange'
	registerOnChange(onChange: any) {
		this.onChange = onChange;
	}

	// inform the parent form that it has been touched by the user
	// save the callback function in a property 'onTouched'
	registerOnTouched(onTouched: any) {
		this.onTouched = onTouched;
	}

	@HostListener('focusout', ['$event'])
	focusout(event) {
		setTimeout(() => {
			if(!this.touched &&
				!this.dateSectionComponent.getFocused &&
				!this.monthSectionComponent.getFocused &&
				!this.yearSectionComponent.getFocused &&
				!this.calendarComponent.getFocused) {

				if(!this.initialized) {
					this.initialized = true;
					this.dispatchDate();
				}

				this.touched = true;
				this.onTouched();
			}
		});
	}

	@HostListener('keydown', ['$event'])
	keydown(event) {
		switch(event.key) {
			case 'ArrowLeft':
				if(document.activeElement === this.yearSectionComponent.element) this.moveYearToMonth();
				else if(document.activeElement === this.monthSectionComponent.element) this.moveMonthToDate();
				break;
			case 'ArrowRight':
				if(document.activeElement === this.dateSectionComponent.element) this.moveDateToMonth();
				else if(document.activeElement === this.monthSectionComponent.element) this.moveMonthToYear();
				break;
		}
	}

	// mousedown is trigged before focusout
	@HostListener('mousedown', ['$event'])
	mousedown(event) {
		const element = event.target;

		if(element.matches('.date-section') ||
			element.matches('.month-section') ||
			element.matches('.year-section') ||
			element.matches('.input-date-backdrop')) {

			this.closeCalendar();
		}
	}

	isValid(value: string): boolean {
		return moment(value, 'YYYY-MM-DD', true).isValid();
	}

	setStatus(value: string): void {
		this.initialized = (value === '') ? false : true;
		[this.year, this.month, this.date] = (value === '') ? ['', '', ''] : value.split('-');
	}

	dispatchDate(): void {
		if(!this.initialized) return;

		const value = `${this.year}-${this.month}-${this.date}`;
		this.isValid(value) ? this.onChange(value) : this.onChange('');
	}

	editDate(date: string): void {
		this.date = date;

		setTimeout(() => {
			// return NaN if the date is an empty string
			const digit = parseInt(date);

			if(digit < 1) {
				this.date = '01';
				this.moveDateToMonth();
			}
			else if(digit >= 4 && digit <= 31) {
				this.moveDateToMonth();
			}
			else if(digit > 31) {
				this.date = '31';
				this.moveDateToMonth();
			}

			this.dispatchDate();
		});
	}

	editMonth(month: string): void {
		this.month = month;

		setTimeout(() => {
			// return NaN if the month is an empty string
			const digit = parseInt(month);

			if(digit < 1) {
				this.month = '01';
				this.moveMonthToYear();
			}
			else if(digit >= 2 && digit <= 12) {
				this.moveMonthToYear();
			}
			else if(digit > 12) {
				this.month = '12';
				this.moveMonthToYear();
			}

			this.dispatchDate();
		});
	}

	editYear(year: string): void {
		this.year = year;

		setTimeout(() => {
			// return NaN if the year is an empty string
			const digit = parseInt(year);

			if(digit < 1) this.year = '0001';

			this.dispatchDate();
		});
	}

	moveDateToMonth(): void {
		this.dateSectionComponent.blur();
		this.monthSectionComponent.focus();
	}

	moveMonthToYear(): void {
		this.monthSectionComponent.blur();
		this.yearSectionComponent.focus();
	}

	moveYearToMonth(): void {
		this.yearSectionComponent.blur();
		this.monthSectionComponent.focus();
	}

	moveMonthToDate(): void {
		this.monthSectionComponent.blur();
		this.dateSectionComponent.focus();
	}

	setCalendar(): void {
		this.showCalendar = !this.showCalendar;

		this.calendar = this.showCalendar ? `${this.year}-${this.month}-${this.date}` : '';

		setTimeout(() => {
			this.showCalendar ?
				this.calendarComponent.focus() :
				this.calendarComponent.blur();
		});
	}

	// close calendar after selecting a date
	getCalendarDate(calendar: string): void {
		[this.year, this.month, this.date] = calendar.split('-');

		this.initialized = true;
		this.dispatchDate();
		this.closeCalendar();
	}

	// keep calendar open after selecting year or month
	getCalendarMonth(calendar: string): void {
		[this.year, this.month, this.date] = calendar.split('-');

		this.initialized = true;
		this.dispatchDate();
	}

	closeCalendar(): void {
		this.showCalendar = false;
		this.calendar = '';
	}
}
