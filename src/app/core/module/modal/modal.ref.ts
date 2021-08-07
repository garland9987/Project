import { Subject, Observable } from 'rxjs';

export class ModalRef {
	private closureSubject: Subject<any> = new Subject<any>();
	private responseSubject: Subject<any> = new Subject<any>();

	public closure: Observable<any> = this.closureSubject.asObservable();
	public response: Observable<any> = this.responseSubject.asObservable();

	close(): void { this.closureSubject.next(true); }
	respond(value: any): void { this.responseSubject.next(value); }
}
