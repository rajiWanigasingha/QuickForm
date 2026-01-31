export class NumberValidation {
	private readonly number: number;

	constructor(number: string) {
		this.number = Number(number)
	}

	min(
		min: number,
		err: string = 'Invalid size, please provide number bigger than ' + min
	) {
		if (this.number >= min) {
			return new NumberValidation(this.number.toString());
		}
		throw new Error(err);
	}

	max(
		max: number,
		err: string = 'Invalid size, please provide number smaller than ' + max
	) {
		if (this.number <= max) {
			return new NumberValidation(this.number.toString());
		}
		throw new Error(err);
	}

	inRange(min: number, max: number, err: string = 'Number is not within the range, please provide number between ' + min + ' and ' + max) {
		if (this.number >= min && this.number <= max) {
			return new NumberValidation(this.number.toString());
		}
		throw new Error(err);
	}
}
