export class TextValidationObj {

	private checks: {checker: (val: string) => boolean, err: string}[] = [];

	private clone() {
		const newObj = new TextValidationObj();
		newObj.checks = [...this.checks];
		return newObj;
	}

	minLength(num: number, err: string = 'Minimum length is ' + num) {
		const newObj = this.clone();
		newObj.checks.push({checker: (val) => val.length >= num, err});
		return newObj;
	}

	maxLength(num: number, err: string = 'Maximum length is ' + num) {
		const newObj = this.clone();
		newObj.checks.push({checker: (val) => val.length <= num, err});
		return newObj;
	}

	lengthMustBe(num: number, err: string = 'Length must be ' + num) {
		const newObj = this.clone();
		newObj.checks.push({checker: (val) => val.length === num, err});
		return newObj;
	}

	isEmail(err: string = 'Invalid email') {
		const newObj = this.clone();
		newObj.checks.push({checker: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), err});
		return newObj;
	}

	isRegex(regex: RegExp, err: string = 'Invalid format') {
		const newObj = this.clone();
		newObj.checks.push({checker: (val) => regex.test(val), err});
		return newObj;
	}

	isOk(valueOfValidation: string) {
		this.checks.forEach(check => {
			if (!check.checker(valueOfValidation)) throw new Error(check.err);
		})
	}
}

export const QVText = new TextValidationObj();
