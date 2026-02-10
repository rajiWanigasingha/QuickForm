import { QuickForms } from '$lib/components/FormStateInterface.js';
import type { QuickFormTextInput, QuickFormTextInputActions } from '$lib/types/schema.js';
import { stopSubmit, submitState } from '$lib/components/formStatus.svelte.js';

export class TextState extends QuickForms {
	protected text: string | null = null;
	errors: string = $state("");

	constructor(init: QuickFormTextInput ,private process: QuickFormTextInputActions | null = null) {
		super(init.label, init.helper, init.placeholder);
	}

	resetText() {
		this.text = null;
		this.errors = ""
	}

	submitValidate() {
		if (this.process?.validation !== undefined) {
			try {
				this.process.validation.isOk(this.text ?? "")
			} catch (e : unknown) {
				this.errors = e instanceof Error ? e.message : "Unknown error."
				stopSubmit.panic()
			}
		}
	}

	setText(text: string) {
		this.text = text;

		if (this.process?.preProcess !== undefined) {
			this.text = this.process.preProcess()
		}

		if (this.process?.validation !== undefined) {
			try {
				this.process.validation.isOk(this.text)
			} catch (e : unknown) {
				this.errors = e instanceof Error ? e.message : "Unknown error."
				return
			}
		}

		this.errors = "";

		if (this.process?.postProcess !== undefined) {
			this.text = this.process.postProcess()
		}
	}

	getText() {
		return this.text;
	}
}