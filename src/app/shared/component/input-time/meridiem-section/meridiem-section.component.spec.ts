import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeridiemSectionComponent } from './meridiem-section.component';

describe('MeridiemSectionComponent', () => {
	let component: MeridiemSectionComponent;
	let fixture: ComponentFixture<MeridiemSectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ MeridiemSectionComponent ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MeridiemSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
