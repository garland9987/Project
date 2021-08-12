import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import * as CustomValidators from '@shared/validator/validator.form';

@Component({
	selector: 'app-reactive-form',
	templateUrl: './reactive-form.component.html',
	styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
	public title: string = 'Reactive Form';
	public formGroup: FormGroup;
	public isSubmitted: boolean = false;
	public countries: string[] = ['USA', 'Canada', 'Australia'];

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			name: this.formBuilder.group({
				firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
				lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]]
			}),
			phone: ['', [Validators.required, Validators.pattern('^[0-9]+$'), CustomValidators.startsWith('04')]],
			email: ['', [Validators.required, Validators.email]],
			salary: ['', [Validators.required, Validators.pattern('^([0-9]+)(\.[0-9]+)*$')]],
			gender: ['', [Validators.required]],
			nationality: ['', [Validators.required]],
			description: [''],
			isAgreed: [false, [CustomValidators.isChecked()]],
			file: ['', [Validators.required]]
		});
	}

	get firstName() { return this.formGroup.get('name').get('firstName') as FormControl; }
	get lastName() { return this.formGroup.get('name').get('lastName') as FormControl; }
	get phone() { return this.formGroup.get('phone') as FormControl; }
	get email() { return this.formGroup.get('email') as FormControl; }
	get salary() { return this.formGroup.get('salary') as FormControl; }
	get gender() { return this.formGroup.get('gender') as FormControl; }
	get nationality() { return this.formGroup.get('nationality') as FormControl; }
	get description() { return this.formGroup.get('description') as FormControl; }
	get isAgreed() { return this.formGroup.get('isAgreed') as FormControl; }
	get file() { return this.formGroup.get('file') as FormControl; }

	validation(control: FormControl): {[property: string]: boolean} {
		return {
			'form-valid-status': control.valid && (control.dirty || control.touched || this.isSubmitted),
			'form-invalid-status': control.invalid && (control.dirty || control.touched || this.isSubmitted)
		};
	}

	onSubmit(): void {
		this.isSubmitted = true;

		if(this.formGroup.valid) {
			// operation...
		}

		// debug
		console.log(this.formGroup.value);
	}
}
