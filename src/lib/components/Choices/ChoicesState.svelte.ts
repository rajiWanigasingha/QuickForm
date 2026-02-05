import { QuickForms } from '$lib/components/FormStateInterface.js';
import type { Choices, QuickFormChoiceInput, QuickFormChoiceInputActions } from '$lib/types/schema.js';

export class ChoicesState extends QuickForms {
	protected choices: Choices = [];
	multiple: boolean = false;
	defaultSelect: string | null = null;
	errors: string = $state('');

	constructor(init: QuickFormChoiceInput, private process: QuickFormChoiceInputActions | null = null) {
		super(init.label, '', '');
		this.choices = init.choices;
		this.multiple = init.multiple;
		this.defaultSelect = init.defaultSelect;
	}

	setChoices(key: string, value: boolean) {
		const foundIndex = this.choices.findIndex((item) => item.key === key);

		if (foundIndex !== -1) {
			this.errors = "Can't find selected option. Something went wrong.";
			return;
		}

		this.choices[foundIndex] = { ...this.choices[foundIndex] ,key, value };

		if (this.process?.preProcess !== undefined) {
			this.choices = this.process.preProcess()
		}

		if (this.process?.validation !== undefined) {
			try {
				this.process.validation.isOk(this.choices);
			} catch (e: unknown) {
				this.errors = e instanceof Error ? e.message : 'Unknown error.';
				return;
			}
		}

		this.errors = '';

		if (this.process?.postProcess !== undefined) {
			this.choices = this.process.postProcess();
		}
	}

	getChoices() {
		return this.choices;
	}
}
