import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinuteSectionComponent } from './minute-section.component';

describe('MinuteSectionComponent', () => {
	let component: MinuteSectionComponent;
	let fixture: ComponentFixture<MinuteSectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ MinuteSectionComponent ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MinuteSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
