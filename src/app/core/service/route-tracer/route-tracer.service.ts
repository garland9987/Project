import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { tap, filter, pairwise } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class RouteTracerService {
	public previousUrl: string;
	public currentUrl: string;

	constructor(private router: Router) {
		router.events
			.pipe(
				filter((event: any) => { return event instanceof RoutesRecognized; }),
				tap((event: RoutesRecognized) => { this.currentUrl = event.urlAfterRedirects; }),
				pairwise())
			.subscribe((events: RoutesRecognized[]) => {
				this.previousUrl = events[0].urlAfterRedirects;
				this.currentUrl = events[1].urlAfterRedirects;
			});
	}
}
