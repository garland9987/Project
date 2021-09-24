import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearSectionComponent } from './year-section.component';

describe('YearSectionComponent', () => {
	let component: YearSectionComponent;
	let fixture: ComponentFixture<YearSectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ YearSectionComponent ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(YearSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
