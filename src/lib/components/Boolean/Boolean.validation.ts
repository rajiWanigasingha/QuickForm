export class BooleanValidation {
	constructor(private bool: boolean) {}

	mustBeTrue(err: string = 'This field must be true') {
		if (this.bool) {
			return new BooleanValidation(this.bool);
		}
		throw new Error(err);
	}

	mustBeFalse(err: string = 'This field must be false') {
		if (!this.bool) {
			return new BooleanValidation(this.bool);
		}
		throw new Error(err);
	}
}
