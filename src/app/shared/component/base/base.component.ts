import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnDestroy {
	// reactive form
	public isSubmitted: boolean = false;

	public validation(control: FormControl): {[property: string]: boolean} {
		return {
			'form-valid-status': control.valid && (control.dirty || control.touched || this.isSubmitted),
			'form-invalid-status': control.invalid && (control.dirty || control.touched || this.isSubmitted)
		};
	}

	// unsubscribe observables
	public terminator: Subject<boolean> = new Subject<boolean>();

	ngOnDestroy() {
		this.terminator.next(true);
		this.terminator.complete();
	}
}
