import { Directive, Input, ViewContainerRef, HostListener, Optional, Host, Renderer2 } from '@angular/core';

import { MenuPanelComponent } from './menu-panel/menu-panel.component';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { MenuAlign } from './menu.component';

@Directive({
	selector: '[appMenuTrigger]'
})
export class MenuTriggerDirective {
	public viewContainerRef: ViewContainerRef;
	public menuAlign: MenuAlign;

	// open a menu panel if passing a MenuPanelComponent
	// close the panel if passing a null
	@Input('appMenuTrigger') menuPanel: MenuPanelComponent | null;

	constructor(private renderer: Renderer2,
				@Optional() @Host() private host: MenuButtonComponent) {}

	@HostListener('click')
	click() {
		this.menuPanel ?
			(this.host ? this.menuButtonTrigger() : this.menuPanelTrigger()) :
			this.viewContainerRef.clear();
	}

	menuButtonTrigger(): void {
		this.viewContainerRef.length === 0 ?
			this.createMenuPanel() :
			this.viewContainerRef.clear();
	}

	menuPanelTrigger(): void {
		this.viewContainerRef.clear();
		this.createMenuPanel();
	}

	createMenuPanel() {
		const embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.menuPanel.templateRef);
		const menuPanel = embeddedViewRef.rootNodes[0];

		this.alignMenuPanel(menuPanel);
	}

	alignMenuPanel(element: HTMLElement) {
		switch (this.menuAlign) {
		case 'left':
			this.renderer.addClass(element, 'menu-panel-align-left');
			break;
		case 'center':
			this.renderer.addClass(element, 'menu-panel-align-center');
			break;
		case 'right':
			this.renderer.addClass(element, 'menu-panel-align-right');
			break;
		}
	}
}
