import { QuickForms } from '$lib/components/FormStateInterface.js';
import type { QuickFormTextInput, QuickFormTextInputActions } from '$lib/types/schema.js';

export class TextState extends QuickForms {
	protected text: string = "";
	errors: string = $state("");

	constructor(init: QuickFormTextInput ,private process: QuickFormTextInputActions | null = null) {
		super(init.label, init.helper, init.placeholder);
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