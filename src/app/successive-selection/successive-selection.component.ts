import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-successive-selection',
	templateUrl: './successive-selection.component.html',
	styleUrls: ['./successive-selection.component.scss']
})
export class SuccessiveSelectionComponent implements OnInit{
	public title: string = 'Successive Selection';
	public tasks: any[] = [];

	ngOnInit() {
		this.tasks = [
			{ id: 'task-1', name: 'task 1', isSelected: false },
			{ id: 'task-2', name: 'task 2', isSelected: false },
			{ id: 'task-3', name: 'task 3', isSelected: false },
			{ id: 'task-4', name: 'task 4', isSelected: false },
			{ id: 'task-5', name: 'task 5', isSelected: false },
			{ id: 'task-6', name: 'task 6', isSelected: false },
			{ id: 'task-7', name: 'task 7', isSelected: false },
			{ id: 'task-8', name: 'task 8', isSelected: false },
			{ id: 'task-9', name: 'task 9', isSelected: false },
			{ id: 'task-10', name: 'task 10', isSelected: false }
		];
	}
}
