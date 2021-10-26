import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { Navigation } from '@shared/model/navigation';
import { ScrollService } from '@core/service/scroll/scroll.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public brand: string = 'Falcon';
	public items: Navigation[];

	constructor(private router: Router,
				private scrollService: ScrollService,
				@Inject(DOCUMENT) private document: Document) {}

	ngOnInit() {
		this.items = [
			new Navigation('Home', '/home'),
			new Navigation('Reactive Form', '/reactive-form'),
			new Navigation('Guard', '/guard'),
			new Navigation('Restful', '/restful'),
			new Navigation('Translation', '/translation'),
			new Navigation('Sortable & Draggable', '/sortable'),
			new Navigation('Date & Time', '/date'),
			new Navigation('Wizard', '/wizard'),
			new Navigation('Shift Selection', '/shift-selection')
		];

		this.scrollService.setContainer(this.document.documentElement);
	}

	onDeactivate(): void {
		this.scrollService.scrollToTop();
	}
}
