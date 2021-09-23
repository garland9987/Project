import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

// Return null if the user input is valid
// Return an object if the user input is invalid
export function startsWith(value: string): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const condition1 = control.value.toString().startsWith(value);
		const condition2 = control.value === '';

		return (condition1 || condition2) ? null : { startsWith: { value: value } };
	};
}

export function isChecked(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		return control.value ? null : { isNotChecked: true };
	};
}
