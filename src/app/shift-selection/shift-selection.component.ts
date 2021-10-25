import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-shift-selection',
	templateUrl: './shift-selection.component.html',
	styleUrls: ['./shift-selection.component.scss']
})
export class ShiftSelectionComponent implements OnInit {
	public title: string = 'Shift Selection';
	public tasks: any[] = [];

	ngOnInit() {
		this.tasks = [
			{ id: 'task-1', name: 'task 1', selected: false },
			{ id: 'task-2', name: 'task 2', selected: false },
			{ id: 'task-3', name: 'task 3', selected: false },
			{ id: 'task-4', name: 'task 4', selected: false },
			{ id: 'task-5', name: 'task 5', selected: false },
			{ id: 'task-6', name: 'task 6', selected: false },
			{ id: 'task-7', name: 'task 7', selected: false },
			{ id: 'task-8', name: 'task 8', selected: false },
			{ id: 'task-9', name: 'task 9', selected: false },
			{ id: 'task-10', name: 'task 10', selected: false }
		];
	}
}
