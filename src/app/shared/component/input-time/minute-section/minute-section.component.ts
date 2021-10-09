import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
	selector: 'app-minute-section',
	templateUrl: './minute-section.component.html',
	styleUrls: ['./minute-section.component.scss']
})
export class MinuteSectionComponent implements OnInit, OnChanges {
	public currentInput: string = '';
	public getFocused: boolean = false;

	@Input() minute: string = '';
	@Output() minuteChange = new EventEmitter<string>();

	constructor(private elementRef: ElementRef) {}

	get element(): HTMLInputElement { return this.elementRef.nativeElement.querySelector('input.minute-section'); }

	ngOnInit() {
		this.element.value = this.minute;
	}

	ngOnChanges(changes: SimpleChanges) {
		this.element.value = this.minute;
	}

	focus(): void { this.element.focus(); }
	blur(): void { this.element.blur(); }

	@HostListener('input', ['$event'])
	input(event) {
		// for delete button, the element value is set to an empty string, and is passed to its parent element
		if(this.currentInput === 'Backspace') {
			this.element.value = '';
			this.minuteChange.emit('');

			return;
		}

		// check the first user input when the element gains focus
		// the element value remains unchanged if the first user input is invalid
		// the element value is updated using the first user input if it is valid, and is passed to its parent element
		if(this.getFocused) {
			if(!this.isValidInput(this.currentInput)) {
				this.element.value = this.normalize(this.element.value);
			}
			else {
				this.getFocused = false;
				this.element.value = this.normalize(this.currentInput);
				this.minuteChange.emit(this.element.value);
			}

			return;
		}

		// after the first user input, the element value is normalized for each input and is passed to its parent element
		this.element.value = this.normalize(this.element.value);
		this.minuteChange.emit(this.element.value);
	}

	/**
	 * Return an empty string if the user inputs don't contain any legal input
	 * Return a string containing two legal inputs or one legal input with a leading zero (00 ~ 99)
	 */
	normalize(inputs: string): string {
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
		this.getFocused = true;
		this.locateCursor(event.target);
	}

	@HostListener('focusout', ['$event'])
	focusout(event) {
		this.getFocused = false;
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
		setTimeout(() => { target.setSelectionRange(target.value.length, target.value.length); });
	}
}
