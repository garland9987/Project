export class Utility {
	static isMobileDevice(): boolean {
		return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
	}
}
