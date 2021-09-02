import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { Navigation } from '@shared/model/navigation';
import { ScrollService } from '@core/service/scroll/scroll.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
	public brand: string = 'Falcon';
	public items: Navigation[];

	@ViewChild('viewContent') viewContent: ElementRef;

	constructor(private scrollService: ScrollService) {}

	ngOnInit() {
		this.items = [
			new Navigation('Home', '/home'),
			new Navigation('Reactive Form', '/reactive-form'),
			new Navigation('Guard', '/guard'),
			new Navigation('Restful', '/restful'),
			new Navigation('Translation', '/translation'),
			new Navigation('Sortable', '/sortable')
		];
	}

	ngAfterViewInit(): void {
		this.scrollService.setContainer(this.viewContent.nativeElement);
	}

	onActivate(): void {
		this.viewContent.nativeElement.scrollTop = 0;
	}
}
