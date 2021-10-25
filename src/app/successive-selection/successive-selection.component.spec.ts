import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessiveSelectionComponent } from './successive-selection.component';

describe('SuccessiveSelectionComponent', () => {
	let component: SuccessiveSelectionComponent;
	let fixture: ComponentFixture<SuccessiveSelectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ SuccessiveSelectionComponent ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SuccessiveSelectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
