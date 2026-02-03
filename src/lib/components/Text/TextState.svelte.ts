import { QuickForms } from '$lib/components/FormStateInterface.js';
import type { QuickFormTextInput } from '$lib/types/schema.js';

export class TextState extends QuickForms {
	protected text: string = "";
	errors: string = $state("");

	constructor(init: QuickFormTextInput) {
		super(init.label, init.helper, init.placeholder);
	}

	validation() {}

	preProcess(): string {
		return this.text;
	}

	postProcess() {
		return this.text;
	}

	setText(text: string) {
		this.text = text;

		this.text = this.preProcess()

		try {
			this.validation()
		} catch (e : unknown) {
			this.errors = e instanceof Error ? e.message : "Unknown error."
			return
		}

		this.errors = "";

		this.text = this.postProcess()
	}

	getText() {
		return this.text;
	}
}