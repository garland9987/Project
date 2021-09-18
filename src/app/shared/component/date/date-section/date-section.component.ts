import { Component, HostListener, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChange, ElementRef } from '@angular/core';

@Component({
	selector: 'app-date-section',
	templateUrl: './date-section.component.html',
	styleUrls: ['./date-section.component.scss']
})
export class DateSectionComponent implements OnInit, OnChanges {
	public currentInput: string = '';
	public startTyping: boolean = false;

	@Input() date: string = '';
	@Output() dateChange = new EventEmitter<string>();

	constructor(private elementRef: ElementRef) {}

	get element(): HTMLInputElement { return this.elementRef.nativeElement.querySelector('input.date-section'); }

	ngOnInit() {
		this.element.value = this.date;
	}

	ngOnChanges(changes: {[property: string]: SimpleChange}) {
		this.element.value = this.date;
	}

	getFocus(): void {
		this.element.focus();
	}

	getBlur(): void {
		this.element.blur();
	}

	@HostListener('input', ['$event'])
	input(event) {
		// for delete button, the element value is set to an empty string, and is passed to its parent element
		if(this.currentInput === 'Backspace') {
			this.element.value = '';
			this.dateChange.emit('');

			return;
		}

		// check the first user input when the element gains focus
		// the element value remains unchanged if the first user input is invalid
		// the element value is updated using the first user input if it is valid, and is passed to its parent element
		if(this.startTyping) {
			if(!this.isValidInput(this.currentInput)) {
				this.element.value = this.normailze(this.element.value);
			}
			else {
				this.startTyping = false;
				this.element.value = this.normailze(this.currentInput);
				this.dateChange.emit(this.element.value);
			}

			return;
		}

		// after the first user input, the element value is normalized for each input and is passed to its parent element
		this.element.value = this.normailze(this.element.value);
		this.dateChange.emit(this.element.value);
	}

	/**
	 * Return an empty string if the user inputs don't contain any legal input
	 * Return a string containing two legal inputs or one legal input with a leading zero (00 ~ 99)
	 */
	normailze(inputs: string): string {
		let normalized: string = '';

		normalized = inputs.split('').filter((input) => { return this.isValidInput(input); }).join('');
		normalized = normalized === '' ? '' : ('0' + normalized).slice(-2);

		return normalized;
	}

	isValidInput(input: string): boolean {
		const list: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

		return list.includes(input);
	}

	@HostListener('focusin', ['$event'])
	focusin(event) {
		this.startTyping = true;
		this.locateCursor(event.target);
	}

	@HostListener('focusout', ['$event'])
	focusout(event) {
		this.startTyping = false;
	}

	// ensure the cursor is at the end of the input field
	@HostListener('mousedown', ['$event'])
	mousedown(event) {
		this.locateCursor(event.target);
	}

	// ensure the cursor is at the end of the input field
	@HostListener('touchstart', ['$event'])
	touchstart(event) {
		this.locateCursor(event.target);
	}

	// ensure the cursor is at the end of the input field
	@HostListener('keydown', ['$event'])
	keydown(event) {
		switch(event.key) {
			case 'ArrowLeft':
			case 'ArrowRight':
			case 'ArrowUp':
			// @ts-expect-error
			case 'ArrowDown':
				this.locateCursor(event.target);
			default:
				this.currentInput = event.key;
		}
	}

	locateCursor(target: HTMLInputElement): void {
		setTimeout(() => { target.setSelectionRange(target.value.length, target.value.length); }, 0);
	}
}
