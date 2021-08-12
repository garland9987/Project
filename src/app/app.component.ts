import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { Navigation } from '@shared/model/navigation';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit, AfterViewInit {
	public brand: string = 'Falcon';
	public items: Navigation[];

	ngOnInit() {
		console.log('AppComponent -- ngOnInit');

		this.items = [
			new Navigation('Home', '/home'),
			new Navigation('Reactive Form', '/reactive-form')
		];
	}

	ngAfterContentInit() { console.log('AppComponent -- ngAfterContentInit'); }
	ngAfterViewInit() { console.log('AppComponent -- ngAfterViewInit'); }
}
