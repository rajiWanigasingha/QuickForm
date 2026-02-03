import { QuickForms } from '$lib/components/FormStateInterface.js';
import type { Choices, QuickFormChoiceInput } from '$lib/types/schema.js';

export class ChoicesState extends QuickForms {
	protected choices: Choices = [];
	multiple: boolean = false;
	defaultSelect: string | null = null;
	errors: string = $state('');

	constructor(init: QuickFormChoiceInput) {
		super(init.label, '', '');
		this.choices = init.choices;
		this.multiple = init.multiple;
		this.defaultSelect = init.defaultSelect;
	}

	validation() {}

	preProcess() {
		return this.choices;
	}

	postProcess() {
		return this.choices;
	}

	setChoices(key: string, value: boolean) {
		const foundIndex = this.choices.findIndex((item) => item.key === key);

		if (foundIndex !== -1) {
			this.errors = "Can't find selected option. Something went wrong.";
			return;
		}

		this.choices[foundIndex] = { ...this.choices[foundIndex] ,key, value };

		this.choices = this.preProcess();

		try {
			this.validation();
		} catch (e: unknown) {
			this.errors = e instanceof Error ? e.message : 'Unknown error.';
			return;
		}

		this.errors = '';

		this.choices = this.postProcess();
	}

	getChoices() {
		return this.choices;
	}
}
