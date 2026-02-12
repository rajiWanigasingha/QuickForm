import type { Choices, Selects } from '$lib/types/schema.js';

export type TextValidationBeforeRequired = {
	required(req?: boolean,err?: string): QuickFormTextValidation;
}

export class QuickFormTextValidation {

	private checks: {checker: (val: string) => boolean, err: string}[] = [];
	private requiredField: boolean = false

	private constructor() {}

	static create(): TextValidationBeforeRequired {
		return new QuickFormTextValidation();
	}

	required(req: boolean = true, err: string = "This field is required") {
		const newObj = this.clone();
		if (req) {
			this.requiredField = true;
			newObj.checks.push({
				checker: val => val.trim().length > 0,
				err
			});
		}
		return newObj;
	}

	private clone() {
		const newObj = new QuickFormTextValidation();
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

	isOk(valueOfValidation: string) : boolean {
		this.checks.forEach(check => {
			if (!check.checker(valueOfValidation)) throw new Error(check.err);
		})
		return this.requiredField
	}
}

export class NumberValidationObj {

	private checks: {checker: (val: number) => boolean, err: string}[] = [];

	private clone() {
		const newObj = new NumberValidationObj();
		newObj.checks = [...this.checks];
		return newObj;
	}

	min(num: number, err: string = 'Minimum value is ' + num) {
		const newObj = this.clone();
		newObj.checks.push({checker: (val) => val >= num, err});
		return newObj;
	}

	max(num: number, err: string = 'Maximum value is ' + num) {
		const newObj = this.clone();
		newObj.checks.push({checker: (val) => val <= num, err});
		return newObj;
	}

	lengthMustBe(num: number, err: string = 'Length must be ' + num) {
		const newObj = this.clone();
		newObj.checks.push({checker: (val) => val.toString().length === num, err});
		return newObj;
	}

	isRegex(regex: RegExp, err: string = 'Invalid format') {
		const newObj = this.clone();
		newObj.checks.push({checker: (val) => regex.test(val.toString()), err});
		return newObj;
	}

	isOk(valueOfValidation: number) {
		this.checks.forEach(check => {
			if (!check.checker(valueOfValidation)) throw new Error(check.err);
		})
	}
}

export class BooleanValidationObj {

	private checks: {checker: (val: boolean) => boolean, err: string}[] = [];

	private clone() {
		const newObj = new BooleanValidationObj();
		newObj.checks = [...this.checks];
		return newObj;
	}

	mustBeTrue(err: string = 'This field must be true') {
		const newObj = this.clone();
		newObj.checks.push({checker: (val) => val, err});
		return newObj;
	}

	mustBeFalse(err: string = 'This field must be false') {
		const newObj = this.clone();
		newObj.checks.push({checker: (val) => !val, err});
		return newObj;
	}

	isOk(valueOfValidation: boolean) {
		this.checks.forEach(check => {
			if (!check.checker(valueOfValidation)) throw new Error(check.err);
		})
	}
}

export class ChoiceValidationObj {

	private checks: {checker: (val: Choices) => boolean, err: string}[] = [];

	private clone() {
		const newObj = new ChoiceValidationObj();
		newObj.checks = [...this.checks];
		return newObj;
	}

	isAtLeastOneChecked(err: string = 'At least one option must be checked') {
		const newObj = this.clone();
		newObj.checks.push({checker: (val) => val.some(item => item.value), err});
		return newObj;
	}

	isOk(valueOfValidation: Choices) {
		this.checks.forEach(check => {
			if (!check.checker(valueOfValidation)) throw new Error(check.err);
		})
	}
}

export class SelectValidationObj {

	private checks: {checker: (val: Selects) => boolean, err: string}[] = [];

	private clone() {
		const newObj = new SelectValidationObj();
		newObj.checks = [...this.checks];
		return newObj;
	}

	isAtLeastOneSelected(err: string = 'At least one option must be selected') {
		const newObj = this.clone()
		newObj.checks.push({checker: (val) => val.length > 0, err});
		return newObj;
	}

	maxSelected(num: number, err: string = 'Maximum number of selected options is ' + num) {
		const newObj = this.clone();
		newObj.checks.push({checker: (val) => val.length <= num, err});
		return newObj;
	}

	isOk(valueOfValidation: Selects) {
		this.checks.forEach(check => {
			if (!check.checker(valueOfValidation)) throw new Error(check.err);
		})
	}
}

export class ValidationErrorResponse {
	constructor(private fieldName: string,private errorMessage: string) {}
}

export const QVNumber = new NumberValidationObj();
export const QVBoolean = new BooleanValidationObj();
export const QVChoice = new ChoiceValidationObj();
export const QVSelect = new SelectValidationObj();