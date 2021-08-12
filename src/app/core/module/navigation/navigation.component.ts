import { Component, Input, ViewChild, ElementRef, Renderer2, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { Navigation } from '@shared/model/navigation';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterContentInit,AfterViewInit {
	public userName: string = 'Mark123@gmail.com';

	@Input() brand: string;
	@Input() items: Navigation[];

	@ViewChild('modal') modal: ElementRef;
	@ViewChild('modalContent') modalContent: ElementRef;

	constructor(private renderer: Renderer2) {}

	showModal(): void {
		this.renderer.removeClass(this.modal.nativeElement, 'hide-sidebar-modal');
		this.renderer.addClass(this.modal.nativeElement, 'show-sidebar-modal');

		this.renderer.removeClass(this.modalContent.nativeElement, 'hide-sidebar-content');
		this.renderer.addClass(this.modalContent.nativeElement, 'show-sidebar-content');
	}

	hideModal(): void {
		this.renderer.removeClass(this.modalContent.nativeElement, 'show-sidebar-content');
		this.renderer.addClass(this.modalContent.nativeElement, 'hide-sidebar-content');

		setTimeout(() => {
			this.renderer.removeClass(this.modal.nativeElement, 'show-sidebar-modal');
			this.renderer.addClass(this.modal.nativeElement, 'hide-sidebar-modal');
		}, 500);
	}

	// test of lifecycle hooks
	ngOnInit() { console.log('NavigationComponent -- ngOnInit'); }
	ngAfterContentInit() { console.log('NavigationComponent -- ngAfterContentInit'); }
	ngAfterViewInit() { console.log('NavigationComponent -- ngAfterViewInit'); }
}
