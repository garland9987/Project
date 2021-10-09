import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourSectionComponent } from './hour-section.component';

describe('HourSectionComponent', () => {
	let component: HourSectionComponent;
	let fixture: ComponentFixture<HourSectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ HourSectionComponent ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HourSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
