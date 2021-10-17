export class Utility {
	static isMobileDevice(): boolean {
		return (typeof window.orientation !== 'undefined') || (window.navigator.userAgent.indexOf('IEMobile') !== -1);
	}

	static browser(): string {
		const { userAgent } = window.navigator;

		if(userAgent.includes('Firefox/')) return 'Firefox';
		else if(userAgent.includes('Edg/')) return 'Edge';
		else if(userAgent.includes('Chrome/')) return 'Chrome';
		else if(userAgent.includes('Safari/')) return 'Safari';
		else return '';
	}
}
