import { Component, Input, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';

import { Navigation } from '@shared/model/navigation';
import { ModalRef, ModalService } from '@core/module/modal';
import { LoginComponent } from '@shared/custom-modal/login/login.component';
import { LoginService } from '@core/service/login/login.service';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
	public userName: string;

	@Input() brand: string;
	@Input() items: Navigation[];

	@ViewChild('modal') modal: ElementRef;
	@ViewChild('modalContent') modalContent: ElementRef;

	constructor(private renderer: Renderer2,
				private modalService: ModalService,
				private loginService: LoginService) {}

	ngOnInit() {
		this.loginService.isLogin
			.subscribe((isLogin) => {
				isLogin ?
					(this.userName = this.loginService.retrieveUserName()) :
					(this.userName = '');
			});
	}

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

	login(): void {
		this.modalService.open(LoginComponent);
	}
}
