import { QuickForms } from '$lib/components/FormStateInterface.js';

export class NumberState extends QuickForms {
	protected number: string = '';
	errors: string = $state('');

	constructor(label: string, helper: string, placeholder: string) {
		super(label, helper, placeholder);
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