import { QuickForms } from '$lib/components/FormStateInterface.js';
import type { Selects } from '$lib/types/schema.js';

export class SelectState extends QuickForms {
	protected select: Selects = [];
	multiple: boolean = false;
	defaultSelect: string | null = null;
	errors: string = $state('');

	constructor(
		label: string,
		helper: string,
		select: Selects,
		multiple: boolean = false,
		defaultSelect: string | null = null
	) {
		super(label, helper, "");
		this.select = select;
		this.multiple = multiple;
		this.defaultSelect = defaultSelect;
	}

	validation() {}

	preProcess() {
		return this.select;
	}

	postProcess() {
		return this.select;
	}

	setSelect(value: string) {
		const foundIndex = this.select.findIndex((item) => item.value === value);

		if (foundIndex !== -1) {
			this.errors = "Can't find selected option. Something went wrong.";
			return;
		}

		this.select[foundIndex] = { ...this.select[foundIndex] ,value };

		this.select = this.preProcess();

		try {
			this.validation();
		} catch (e: unknown) {
			this.errors = e instanceof Error ? e.message : 'Unknown error.';
			return;
		}

		this.errors = '';

		this.select = this.postProcess();
	}

	getSelect() {
		return this.select;
	}
}
