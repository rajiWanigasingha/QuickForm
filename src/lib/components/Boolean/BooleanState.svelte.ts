import { QuickForms } from '$lib/components/FormStateInterface.js';
import type { QuickFormBooleanInput, QuickFormBooleanInputActions } from '$lib/types/schema.js';

export class BooleanState extends QuickForms {
	protected boolean: boolean = false;
	errors: string = $state('');

	constructor(init: QuickFormBooleanInput ,private process: QuickFormBooleanInputActions | null = null) {
		super(init.label, init.helper ,'');
	}

	setBoolean(bool: boolean) {
		this.boolean = bool;

		console.log(this.boolean);

		if (this.process?.preProcess !== undefined) {
			this.boolean = this.process.preProcess();
		}

		if (this.process?.validation !== undefined) {
			try {
				this.process.validation.isOk(this.boolean);
			} catch (e: unknown) {
				this.errors = e instanceof Error ? e.message : 'Unknown error.';
				return;
			}
		}

		this.errors = '';

		if (this.process?.postProcess !== undefined) {
			this.boolean = this.process.postProcess();
		}
	}

	getBoolean() {
		return this.boolean;
	}
}