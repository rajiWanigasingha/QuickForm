import { QuickForms } from '$lib/components/FormStateInterface.js';
import type { QuickFormBooleanInput } from '$lib/types/schema.js';

export class BooleanState extends QuickForms {
	protected boolean: boolean = false;
	errors: string = $state('');

	constructor(init: QuickFormBooleanInput) {
		super(init.label, init.helper ,'');
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