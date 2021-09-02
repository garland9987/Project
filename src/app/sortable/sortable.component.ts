import { Component } from '@angular/core';

@Component({
	selector: 'app-sortable',
	templateUrl: './sortable.component.html',
	styleUrls: ['./sortable.component.scss']
})
export class SortableComponent {
	public title: string = 'Sortable List';

	public items: any[] = [
		{ id: 1, code: 'robot-1', name: 'Andrew' },
		{ id: 2, code: 'robot-2', name: 'Daisy' },
		{ id: 3, code: 'robot-3', name: 'Edward' },
		{ id: 4, code: 'robot-4', name: 'Juliana' },
		{ id: 5, code: 'robot-5', name: 'Darren' },
		{ id: 6, code: 'robot-6', name: 'Lydia' }
	]
}
