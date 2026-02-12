import { QuickForms } from '$lib/components/FormStateInterface.js';
import type { QuickFormTextInput, QuickFormTextInputActions } from '$lib/types/schema.js';
import { stopSubmit } from '$lib/components/formStatus.svelte.js';

export class TextState extends QuickForms {
	protected text: string | null = null;
	errors: string = $state("");
	required: boolean = false;

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
				if (!stopSubmit.stop) {
					stopSubmit.panic()
				}
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
				this.required = this.process.validation.isOk(this.text)
			} catch (e : unknown) {
				this.errors = e instanceof Error ? e.message : "Unknown error."
				return
			}
		}

		this.errors = "";
	}

	serverProcess(formData: string) {
		if (this.process?.postProcess !== undefined) {
			 return this.process.postProcess(formData)
		} else {
			return null
		}
	}
}