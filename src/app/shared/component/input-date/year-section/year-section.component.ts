import { Component, HostListener, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ElementRef } from '@angular/core';

@Component({
	selector: 'app-year-section',
	templateUrl: './year-section.component.html',
	styleUrls: ['./year-section.component.scss']
})
export class YearSectionComponent implements OnInit, OnChanges {
	public currentInput: string = '';
	public getFocused: boolean = false;

	@Input() year: string = '';
	@Output() yearChange = new EventEmitter<string>();

	constructor(private elementRef: ElementRef) {}

	get element(): HTMLInputElement { return this.elementRef.nativeElement.querySelector('input.year-section'); }

	ngOnInit() {
		this.element.value = this.year;
	}

	ngOnChanges(changes: SimpleChanges) {
		this.element.value = this.year;
	}

	focus(): void { this.element.focus(); }
	blur(): void { this.element.blur(); }

	@HostListener('input', ['$event'])
	input(event) {
		// for delete button, the element value is set to an empty string, and is passed to its parent element
		if(this.currentInput === 'Backspace') {
			this.element.value = '';
			this.yearChange.emit('');

			return;
		}

		// check the first user input when the element gains focus
		// the element value remains unchanged if the first user input is invalid
		// the element value is updated using the first user input if it is valid, and is passed to its parent element
		if(this.getFocused) {
			if(!this.isValidInput(this.currentInput)) {
				this.element.value = this.normailze(this.element.value);
			}
			else {
				this.getFocused = false;
				this.element.value = this.normailze(this.currentInput);
				this.yearChange.emit(this.element.value);
			}

			return;
		}

		// after the first user input, the element value is normalized for each input and is passed to its parent element
		this.element.value = this.normailze(this.element.value);
		this.yearChange.emit(this.element.value);
	}

	/**
	 * Return an empty string if the user inputs don't contain any legal input
	 * Return a string containing four legal inputs or consisting of less than 4 legal inputs and leading zeros (0000 ~ 9999)
	 */
	normailze(inputs: string): string {
		let normalized: string = '';

		normalized = inputs.split('').filter((input) => { return this.isValidInput(input); }).join('');
		normalized = normalized === '' ? '' : ('000' + normalized).slice(-4);

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
		setTimeout(() => { target.setSelectionRange(target.value.length, target.value.length); }, 0);
	}
}
