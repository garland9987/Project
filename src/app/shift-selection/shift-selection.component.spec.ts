import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftSelectionComponent } from './shift-selection.component';

describe('ShiftSelectionComponent', () => {
	let component: ShiftSelectionComponent;
	let fixture: ComponentFixture<ShiftSelectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ ShiftSelectionComponent ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ShiftSelectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
