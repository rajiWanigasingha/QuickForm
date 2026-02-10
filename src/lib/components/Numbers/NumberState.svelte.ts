import { QuickForms } from '$lib/components/FormStateInterface.js';
import type { QuickFormNumberInput, QuickFormNumberInputActions } from '$lib/types/schema.js';
import { stopSubmit } from '$lib/components/formStatus.svelte.js';

export class NumberState extends QuickForms {
	errors: string = $state('');
	protected number: string | null = null;

	constructor(init: QuickFormNumberInput ,private process: QuickFormNumberInputActions | null = null) {
		super(init.label, init.helper, init.placeholder);
	}

	resetNumber() {
		this.errors = ''
		this.number = null
	}

	submitValidate() {
		if (this.process?.validation !== undefined) {
			try {
				this.process.validation.isOk(Number(this.number ?? 0))
			} catch (e : unknown) {
				this.errors = e instanceof Error ? e.message : "Unknown error."
				if (!stopSubmit.stop) {
					stopSubmit.panic()
				}
			}
		}
	}

	setNumber(number: string) {
		this.number = number;

		if (this.process?.preProcess !== undefined) {
			this.number = this.process.preProcess().toString()
		}

		if (this.process?.validation !== undefined) {
			try {
				this.process.validation.isOk(Number(this.number));
			} catch (e: unknown) {
				this.errors = e instanceof Error ? e.message : 'Unknown error.';
				return;
			}
		}

		this.errors = '';

		if (this.process?.postProcess !== undefined) {
			this.number = this.process.postProcess().toString();
		}
	}

	getNumber() {
		return this.number;
	}
}