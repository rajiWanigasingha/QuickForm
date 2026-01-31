import { QuickForms } from '$lib/components/FormStateInterface.js';

export class TextState extends QuickForms {
	protected text: string = "";

	constructor(label: string, helper: string, placeholder: string) {
		super(label, helper, placeholder);
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

		this.validation()

		this.text = this.postProcess()
	}

	getText() {
		return this.text;
	}
}