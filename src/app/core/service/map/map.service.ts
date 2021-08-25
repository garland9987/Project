import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class MapService {
	private map = new Map();

	set(key: any, value: any): void { this.map.set(key, value); }
	get(key: any): any { return this.map.get(key); }
	has(key: any): boolean { return this.map.has(key); }
	delete(key: any): boolean { return this.map.delete(key); }
}
