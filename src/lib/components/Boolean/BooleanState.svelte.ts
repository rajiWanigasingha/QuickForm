import { QuickForms } from '$lib/components/FormStateInterface.js';

export class BooleanState extends QuickForms {
	protected boolean: boolean = false;
	errors: string = $state('');

	constructor(label: string, helper: string, placeholder: string) {
		super(label, helper, placeholder);
	}

	validation() {}

	preProcess() {
		return this.boolean;
	}

	postProcess() {
		return this.boolean;
	}

	setBoolean(bool: boolean) {
		this.boolean = bool;

		this.boolean = this.preProcess();

		try {
			this.validation();
		} catch (e: unknown) {
			this.errors = e instanceof Error ? e.message : 'Unknown error.';
			return;
		}

		this.errors = '';

		this.boolean = this.postProcess();
	}

	getBoolean() {
		return this.boolean;
	}
}