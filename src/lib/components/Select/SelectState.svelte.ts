import { QuickForms } from '$lib/components/FormStateInterface.js';
import type { QuickFormSelectInput, QuickFormSelectInputActions, Selects } from '$lib/types/schema.js';
import { stopSubmit } from '$lib/components/formStatus.svelte.js';

export class SelectState extends QuickForms {
	readonly type = 'arrayOfText'
	private readonly selectConst : Selects = []
	protected select: Selects = [];
	protected selectOptions: Selects = [];
	multiple: boolean = false;
	defaultSelect: string | null = null;
	errors: string = $state('');

	constructor(init: QuickFormSelectInput ,private process: QuickFormSelectInputActions | null = null) {
		super(init.label, init.helper, init.placeholder);
		this.selectConst = init.select
		this.select = init.select;
		this.multiple = init.multiple;
		this.defaultSelect = init.defaultSelect;
	}

	submitValidate() {
		if (this.process?.validation !== undefined) {
			try {
				this.process.validation.isOk(this.selectOptions)
			} catch (e : unknown) {
				this.errors = e instanceof Error ? e.message : "Unknown error."
				if (!stopSubmit.stop) {
					stopSubmit.panic()
				}
			}
		}
	}

	resetSelect() {
		this.select = this.select = this.selectConst
		this.selectOptions = []
		this.errors = ''
	}

	setSelect(value: Selects) {

		this.selectOptions = value;

		if (this.process?.preProcess !== undefined) {
			this.selectOptions = this.process.preProcess()
		}

		if (this.process?.validation !== undefined) {
			try {
				this.process.validation.isOk(this.selectOptions);
			} catch (e: unknown) {
				this.errors = e instanceof Error ? e.message : 'Unknown error.';
				return;
			}
		}

		this.errors = '';

		if (this.process?.postProcess !== undefined) {
			this.selectOptions = this.process.postProcess();
		}
	}

	getSelect() {
		return this.select;
	}

	getSelectOptions() {
		return this.selectOptions;
	}
}
