import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Component({
	selector: 'app-meridiem-section',
	templateUrl: './meridiem-section.component.html',
	styleUrls: ['./meridiem-section.component.scss']
})
export class MeridiemSectionComponent implements OnInit, OnChanges {
	public currentInput: string = '';
	public getFocused: boolean = false;

	@Input() meridiem: string = '';
	@Output() meridiemChange = new EventEmitter<string>();

	constructor(private elementRef: ElementRef) {}

	get element(): HTMLInputElement { return this.elementRef.nativeElement.querySelector('input.meridiem-section'); }

	ngOnInit() {
		this.element.value = this.meridiem;
	}

	ngOnChanges(changes: SimpleChanges) {
		this.element.value = this.meridiem;
	}

	focus(): void { this.element.focus(); }
	blur(): void { this.element.blur(); }

	@HostListener('input', ['$event'])
	input(event) {
		// for delete button, the element value is set to an empty string, and is passed to its parent element
		if(this.currentInput === 'Backspace') {
			this.element.value = '';
			this.meridiemChange.emit('');

			return;
		}

		// normalize the user input and pass it to the parent element
		this.element.value = this.normalize(this.element.value);
		this.meridiemChange.emit(this.element.value);
	}

	/**
	 * Return an empty string if the user inputs don't contain any legal input
	 * Return 'am' or 'pm' when entering 'a' or 'p' respectively, and ignore any other inputs
	 */
	normalize(inputs: string): string {
		let normalized: string = '';

		normalized = inputs.split('').filter((input) => { return this.isValidInput(input); }).join('');
		normalized = normalized === '' ? '' : (normalized.slice(-1) + 'm');

		return normalized;
	}

	isValidInput(input: string): boolean {
		const list: string[] = ['a', 'p'];

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
