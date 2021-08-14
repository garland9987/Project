import { FormControl } from '@angular/forms';

export class BasicForm {
	public isSubmitted: boolean = false;

	public validation(control: FormControl): {[property: string]: boolean} {
		return {
			'form-valid-status': control.valid && (control.dirty || control.touched || this.isSubmitted),
			'form-invalid-status': control.invalid && (control.dirty || control.touched || this.isSubmitted)
		};
	}
}
