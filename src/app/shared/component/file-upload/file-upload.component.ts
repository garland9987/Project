import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: FileUploadComponent,
		multi: true
	}]
})
export class FileUploadComponent implements ControlValueAccessor {
	public fileName: string = '';
	public touched: boolean = false;

	public onChange = (dataUrl: any) => {};
	public onTouched = () => {};

	@Input() fileType: string = '';

	upload(event) {
		if(event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			const reader = new FileReader();

			reader.readAsDataURL(file);
			reader.onload = () => {
				this.fileName = file.name;
				this.onChange(reader.result);
			}
		}
	}

	remove() {
		this.fileName = '';
		this.onChange('');
	}

	blur() {
		if(!this.touched) {
			this.touched = true;
			this.onTouched();
		}
	}

	// pass the initial value from the parent form (by ngModal or formControlName)
	writeValue(file: any) {
		this.fileName = file;
	}

	// pass the new value back to the parent form (received by ngModal or formControlName)
	// save the callback function in a property 'onChange'
	registerOnChange(onChange: any) {
		this.onChange = onChange;
	}

	// inform the parent form that it has been touched by the user
	// save the callback function in a property 'onTouched'
	registerOnTouched(onTouched: any) {
		this.onTouched = onTouched;
	}
}
