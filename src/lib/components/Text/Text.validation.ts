export class TextValidation {
	constructor(private text: string) {}

	minLength(min: number ,err: string = "Invalid length, please provide text bigger than " + min + " characters") {
		 if (this.text.length >= min) {
				return new TextValidation(this.text);
			} throw new Error(err);
	}

	maxLength(max: number ,err: string = "Invalid length, please provide text smaller than " + max + " characters") {
		 if (this.text.length <= max) {
				return new TextValidation(this.text);
		 }  throw new Error(err);
	}
}