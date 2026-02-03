import { QuickForms } from '$lib/components/FormStateInterface.js';
import type { QuickFormNumberInput } from '$lib/types/schema.js';

export class NumberState extends QuickForms {
	protected number: string = '';
	errors: string = $state('');

	constructor(init: QuickFormNumberInput) {
		super(init.label, init.helper, init.placeholder);
	}

	validation() {}

	preProcess(): string {
		return this.number;
	}

	postProcess() {
		return this.number;
	}

	setNumber(number: string) {
		this.number = number;

		this.number = this.preProcess();

		try {
			this.validation();
		} catch (e: unknown) {
			this.errors = e instanceof Error ? e.message : 'Unknown error.';
			return;
		}

		this.errors = '';

		this.number = this.postProcess();
	}

	getNumber() {
		return this.number;
	}
}