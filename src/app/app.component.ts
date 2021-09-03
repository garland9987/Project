import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Navigation } from '@shared/model/navigation';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public brand: string = 'Falcon';
	public items: Navigation[];

	constructor(@Inject(DOCUMENT) private document: Document) {}

	ngOnInit() {
		this.items = [
			new Navigation('Home', '/home'),
			new Navigation('Reactive Form', '/reactive-form'),
			new Navigation('Guard', '/guard'),
			new Navigation('Restful', '/restful'),
			new Navigation('Translation', '/translation'),
			new Navigation('Sortable & Draggable', '/sortable')
		];
	}

	onDeactivate(): void {
  		this.document.body.scrollTop = 0;
	}
}
