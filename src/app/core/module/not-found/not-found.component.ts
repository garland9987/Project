import { Component } from '@angular/core';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
	public title: string = '404';
	public subtitle: string = 'Page not found';
}
