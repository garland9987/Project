import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsavedComponent } from './unsaved.component';

describe('UnsavedComponent', () => {
	let component: UnsavedComponent;
	let fixture: ComponentFixture<UnsavedComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ UnsavedComponent ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UnsavedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
