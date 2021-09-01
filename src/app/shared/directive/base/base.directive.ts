import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
	selector: '[appBase]'
})
export class BaseDirective implements OnDestroy {

	// unsubscribe observables
	public terminator: Subject<boolean> = new Subject<boolean>();

	ngOnDestroy() {
		this.terminator.next(true);
		this.terminator.complete();
	}
}
