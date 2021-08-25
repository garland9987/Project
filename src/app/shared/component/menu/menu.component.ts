import { Component, Input, AfterContentInit, ContentChild, ContentChildren, QueryList, ViewContainerRef } from '@angular/core';

import { MenuButtonComponent } from './menu-button/menu-button.component';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';
import { MenuTriggerDirective } from './menu-trigger.directive';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterContentInit {
	public container: ViewContainerRef;

	@Input() menuAlign: string = 'left';

	@ContentChild(MenuButtonComponent) menuButton: MenuButtonComponent;
	@ContentChildren(MenuTriggerDirective, { descendants: true }) menuTriggers: QueryList<MenuTriggerDirective>;

	ngAfterContentInit() {
		this.container = this.menuButton.viewContainerRef;
		this.menuTriggers.forEach((menuTrigger: MenuTriggerDirective) => {
			menuTrigger.viewContainerRef = this.menuButton.viewContainerRef;
			menuTrigger.menuAlign = this.menuAlign;
		});
	}

	closeMenu(): void {
		this.container.clear();
	}
}
