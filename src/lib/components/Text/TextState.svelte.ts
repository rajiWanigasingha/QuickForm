import { QuickForms } from '$lib/components/FormStateInterface.js';

export class TextState extends QuickForms {
	protected text: string = "";
	errors: string = $state("");

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