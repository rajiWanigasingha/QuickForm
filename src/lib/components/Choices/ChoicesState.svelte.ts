import { QuickForms } from '$lib/components/FormStateInterface.js';
import type { Choices, QuickFormChoiceInput, QuickFormChoiceInputActions } from '$lib/types/schema.js';
import { stopSubmit } from '$lib/components/formStatus.svelte.js';

export class ChoicesState extends QuickForms {
	readonly type = 'string'
	private readonly choicesConst : Choices = [];
	protected choices: Choices = [];
	multiple: boolean = false;
	defaultSelect: string | null = null;
	errors: string = $state('');

	constructor(init: QuickFormChoiceInput, private process: QuickFormChoiceInputActions | null = null) {
		super(init.label, '', '');
		this.choicesConst = init.choices
		this.choices = init.choices;
		this.multiple = init.multiple;
		this.defaultSelect = init.defaultSelect;
	}

	submitValidate() {
		if (this.process?.validation !== undefined) {
			try {
				this.process.validation.isOk(this.choices)
			} catch (e : unknown) {
				this.errors = e instanceof Error ? e.message : "Unknown error."
				if (!stopSubmit.stop) {
					stopSubmit.panic()
				}
			}
		}
	}

	resetChoices() {
		this.choices = this.choicesConst;
		this.errors = ''
	}

	setChoices(key: string, value: boolean) {
		const foundIndex = this.choices.findIndex((item) => item.key === key);

		if (foundIndex === -1) {
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
