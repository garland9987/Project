import { Component, Input, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';

@Component({
	selector: 'app-account-management',
	templateUrl: './account-management.component.html',
	styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit, AfterContentInit,AfterViewInit {
	@Input() userName: string;

	// test of lifecycle hooks
	ngOnInit() { console.log('AccountManagementComponent -- ngOnInit'); }
	ngAfterContentInit() { console.log('AccountManagementComponent -- ngAfterContentInit'); }
	ngAfterViewInit() { console.log('AccountManagementComponent -- ngAfterViewInit'); }
}
