import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseComponent } from '@shared/component/base/base.component';

@Component({
	selector: 'app-date-input',
	templateUrl: './date-input.component.html',
	styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent extends BaseComponent implements OnInit {
	public title: string = 'Date & Time';
	public now: Date = new Date();
	public formGroup: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		super();
	}

	ngOnInit() {
		// the 'value' attribute is used to set value for the input element
		// the format of the 'value' attribute for 'date', 'time' and 'datetime-local' are 'yyyy-MM-dd', 'HH:mm' and 'yyyy-MM-ddTHH:mm' respectively
		this.formGroup = this.formBuilder.group({
			date: [formatDate(this.now, 'yyyy-MM-dd', 'en'), [Validators.required]],
			time: [formatDate(this.now, 'HH:mm', 'en'), [Validators.required]],
			datetime: [formatDate(this.now, 'yyyy-MM-ddTHH:mm', 'en'), [Validators.required]]
		});
	}

	get date() { return this.formGroup.get('date') as FormControl; }
	get time() { return this.formGroup.get('time') as FormControl; }
	get datetime() { return this.formGroup.get('datetime') as FormControl; }

	onSubmit(): void {
		this.isSubmitted = true;

		if(this.formGroup.valid) {
			// operation...
		}

		// debug
		console.log(this.formGroup.value);
	}
}
