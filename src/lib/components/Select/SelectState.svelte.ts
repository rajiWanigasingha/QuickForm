import { QuickForms } from '$lib/components/FormStateInterface.js';
import type { QuickFormSelectInput, QuickFormSelectInputActions, Selects } from '$lib/types/schema.js';

export class SelectState extends QuickForms {
	protected select: Selects = [];
	multiple: boolean = false;
	defaultSelect: string | null = null;
	errors: string = $state('');

	constructor(init: QuickFormSelectInput ,private process: QuickFormSelectInputActions | null = null) {
		super(init.label, init.helper, init.placeholder);
		this.select = init.select;
		this.multiple = init.multiple;
		this.defaultSelect = init.defaultSelect;
	}

	setSelect(value: string) {
		const foundIndex = this.select.findIndex((item) => item.value === value);

		if (foundIndex !== -1) {
			this.errors = "Can't find selected option. Something went wrong.";
			return;
		}

		this.select[foundIndex] = { ...this.select[foundIndex], value };

		if (this.process?.preProcess !== undefined) {
			this.select = this.process.preProcess()
		}

		if (this.process?.validation !== undefined) {
			try {
				this.process.validation.isOk(this.select);
			} catch (e: unknown) {
				this.errors = e instanceof Error ? e.message : 'Unknown error.';
				return;
			}
		}

		this.errors = '';

		if (this.process?.postProcess !== undefined) {
			this.select = this.process.postProcess();
		}
	}

	getSelect() {
		return this.select;
	}
}
