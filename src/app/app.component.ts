import { Component, OnInit } from '@angular/core';
import { Navigation } from '@shared/model/navigation';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public brand: string = 'Falcon';
	public items: Navigation[];

	ngOnInit() {
		this.items = [
			new Navigation('Home', '/home'),
			new Navigation('Reactive Form', '/reactive-form'),
			new Navigation('Guard', '/guard')
		];
	}
}
