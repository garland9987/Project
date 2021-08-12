import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
	selector: 'app-menu-panel',
	templateUrl: './menu-panel.component.html',
	styleUrls: ['./menu-panel.component.scss'],
	exportAs: 'appMenuPanel'
})
export class MenuPanelComponent {
	@ViewChild(TemplateRef) templateRef: TemplateRef<any>;
}
