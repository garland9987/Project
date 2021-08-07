export class ModalContext {
	constructor(public title: string,
				public content: string,
				public buttons?: [string, any][]) {}
}
