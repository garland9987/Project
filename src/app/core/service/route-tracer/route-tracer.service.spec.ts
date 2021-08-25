import { TestBed } from '@angular/core/testing';

import { RouteTracerService } from './route-tracer.service';

describe('RouteTracerService', () => {
	let service: RouteTracerService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RouteTracerService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
