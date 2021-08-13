import { TestBed } from '@angular/core/testing';

import { AuthoriedGuard } from './authoried.guard';

describe('AuthoriedGuard', () => {
	let guard: AuthoriedGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(AuthoriedGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});
