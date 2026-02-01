import type { Choices } from '$lib/types/schema.js';

export class ChoicesValidation {
	constructor(private choice: Choices) {}

	requiredOne(err: string = 'Please select at least one option') {
		if (this.choice.length !== 0 && this.choice.every((item) => !item.value)) {
			return new ChoicesValidation(this.choice);
		}

		throw new Error(err);
	}

	requiredAmount(more: number ,less: number ,err: string = 'Please select more than' + more + ' options and less than ' + less + ' options') {
		let amountFound = 0;
		this.choice.forEach((item) => {
			if (item.value) amountFound++;
		})
		if (amountFound >= more && amountFound <= less) {
			return new ChoicesValidation(this.choice);
		}
		throw new Error(err);
	}
}
