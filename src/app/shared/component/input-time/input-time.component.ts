import { Component, ViewChild, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import * as moment from 'moment';

import { HourSectionComponent } from './hour-section/hour-section.component';
import { MinuteSectionComponent } from './minute-section/minute-section.component';
import { MeridiemSectionComponent } from './meridiem-section/meridiem-section.component';

@Component({
	selector: 'app-input-time',
	templateUrl: './input-time.component.html',
	styleUrls: ['./input-time.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: InputTimeComponent,
		multi: true
	}]
})
export class InputTimeComponent implements ControlValueAccessor {
	public initialized: boolean = false;
	public touched: boolean = false;

	public hour: string = '';
	public minute: string = '';
	public meridiem: string = '';

	public onChange = (value: string) => {};
	public onTouched = () => {};

	@ViewChild(HourSectionComponent) hourSectionComponent: HourSectionComponent;
	@ViewChild(MinuteSectionComponent) minuteSectionComponent: MinuteSectionComponent;
	@ViewChild(MeridiemSectionComponent) meridiemSectionComponent: MeridiemSectionComponent;

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
				!this.hourSectionComponent.getFocused &&
				!this.minuteSectionComponent.getFocused &&
				!this.meridiemSectionComponent.getFocused) {

				if(!this.initialized) {
					this.initialized = true;
					this.dispatchTime();
				}

				this.touched = true;
				this.onTouched();
			}
		}, 0);
	}

	@HostListener('keydown', ['$event'])
	keydown(event) {
		switch(event.key) {
			case 'ArrowLeft':
				if(document.activeElement === this.meridiemSectionComponent.element) this.moveMeridiemToMinute();
				else if(document.activeElement === this.minuteSectionComponent.element) this.moveMinuteToHour();
				break;
			case 'ArrowRight':
				if(document.activeElement === this.hourSectionComponent.element) this.moveHourToMinute();
				else if(document.activeElement === this.minuteSectionComponent.element) this.moveMinuteToMeridiem();
				break;
		}
	}

	isValid(value: string): boolean {
		return moment(value, 'HH:mm', true).isValid();
	}

	setStatus(value: string): void {
		this.initialized = (value === '') ? false : true;
		[this.hour, this.minute, this.meridiem] = (value === '') ? ['', '', ''] : moment(value, 'HH:mm', true).format('hh,mm,a').split(',');
	}

	dispatchTime(): void {
		if(!this.initialized) return;

		const value = moment(`${this.hour}:${this.minute} ${this.meridiem}`, 'hh:mm a', true).format('HH:mm');
		this.isValid(value) ? this.onChange(value) : this.onChange('');
	}

	// the range is from 01 to 12
	editHour(hour: string): void {
		this.hour = hour;

		setTimeout(() => {
			// return NaN if the date is an empty string
			const digit = parseInt(hour);

			if(digit < 1) {
				this.hour = '01';
				this.moveHourToMinute();
			}
			else if(digit >= 2 && digit <= 12) {
				this.moveHourToMinute();
			}
			else if(digit > 12) {
				this.hour = '12';
				this.moveHourToMinute();
			}

			this.dispatchTime();
		}, 0);
	}

	// the range is from 00 to 59
	editMinute(minute: string): void {
		this.minute = minute;

		setTimeout(() => {
			// return NaN if the date is an empty string
			const digit = parseInt(minute);

			if(digit === 0) {
				this.moveMinuteToMeridiem();
			}
			else if(digit >= 6 && digit <= 59) {
				this.moveMinuteToMeridiem();
			}
			else if(digit > 59) {
				this.minute = '59';
				this.moveMinuteToMeridiem();
			}

			this.dispatchTime();
		}, 0);
	}

	editMeridiem(meridiem: string): void {
		this.meridiem = meridiem;

		setTimeout(() => {
			this.dispatchTime();
		}, 0);
	}

	moveHourToMinute(): void {
		this.hourSectionComponent.blur();
		this.minuteSectionComponent.focus();
	}

	moveMinuteToMeridiem(): void {
		this.minuteSectionComponent.blur();
		this.meridiemSectionComponent.focus();
	}

	moveMeridiemToMinute(): void {
		this.meridiemSectionComponent.blur();
		this.minuteSectionComponent.focus();
	}

	moveMinuteToHour(): void {
		this.minuteSectionComponent.blur();
		this.hourSectionComponent.focus();
	}
}
