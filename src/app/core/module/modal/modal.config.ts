interface ModalConfigList {
	showBackdrop?: boolean;
	showClose?: boolean;
	close?: any;
}

export class ModalConfig {
	public showBackdrop: boolean;
	public showClose: boolean;
	public close: any;

	constructor(modalConfig: ModalConfigList) {
		let { showBackdrop = true, showClose = false, close = null } = modalConfig;

		this.showBackdrop = showBackdrop;
		this.showClose = showClose;
		this.close = close;
	}
}
