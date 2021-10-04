import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardIndicatorComponent } from './wizard-indicator.component';

describe('WizardIndicatorComponent', () => {
	let component: WizardIndicatorComponent;
	let fixture: ComponentFixture<WizardIndicatorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ WizardIndicatorComponent ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(WizardIndicatorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
